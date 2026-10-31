import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartApi } from "../../apis/cartApi";
import { parseVietnamesePrice } from "../priceUtils";

// Helper: lấy id của user hiện tại từ localStorage (hỗ trợ customerID hoặc id)
const getCurrentUserId = () => {
  try {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return null;
    const parsed = JSON.parse(savedUser);
    return parsed?.customerID ?? parsed?.id ?? parsed?.customerId ?? null;
  } catch (e) {
    console.error("Lỗi khi đọc user từ localStorage trong cartSlice:", e);
    return null;
  }
};
// Helper: lấy guest cart từ localStorage
const getGuestCart = () => {
  try {
    const guestCart = localStorage.getItem("guestCart");
    return guestCart ? JSON.parse(guestCart) : [];
  } catch (e) {
    console.error("Lỗi khi đọc guest cart:", e);
    return [];
  }
};

// Helper: lưu guest cart vào localStorage
const saveGuestCart = cartItems => {
  try {
    localStorage.setItem("guestCart", JSON.stringify(cartItems));
  } catch (e) {
    console.error("Lỗi khi lưu guest cart:", e);
  }
};

// Helper: tính tổng tiền cho guest cart
const calculateGuestCartTotal = cartItems => {
  return cartItems.reduce((total, item) => total + (item.totalPrice || 0), 0);
};

// Helper: tính tổng số lượng cho guest cart
const calculateGuestCartItems = cartItems => {
  return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
};

// Helper: normalize a cart item from any shape into canonical shape used by UI
const normalizeCartItem = raw => {
  if (!raw || typeof raw !== "object") return null;

  // Helpers to read fields with multiple possible names
  const read = (obj, ...keys) => {
    for (const k of keys) {
      if (obj[k] !== undefined && obj[k] !== null) return obj[k];
    }
    return undefined;
  };

  // product id may be nested or direct
  const productFromRaw = read(raw, "product", "Product") || {};
  const productId =
    read(productFromRaw, "id", "productId") ||
    read(raw, "productId", "product_id", "productID") ||
    null;
  const productName =
    read(productFromRaw, "name", "productName") ||
    read(raw, "name", "productName") ||
    "";
  const productImage =
    read(productFromRaw, "imageUrl", "image", "image_url") ||
    read(raw, "imageUrl", "image") ||
    "";

  // prices and quantities
  const rawUnit =
    read(raw, "unitPrice", "price", "unit_price") ??
    read(productFromRaw, "unitPrice", "price");
  let unitPrice = rawUnit;
  if (typeof unitPrice === "string") {
    try {
      unitPrice = parseFloat(String(unitPrice).replace(/[^0-9.-]+/g, "")) || 0;
    } catch (e) {
      unitPrice = 0;
    }
  }
  unitPrice = unitPrice ?? 0;

  const quantity = Number(read(raw, "quantity", "qty", "amount")) || 0;

  const rawTotal = read(raw, "totalPrice", "total", "amount") || null;
  let totalPrice = rawTotal;
  if (typeof totalPrice === "string") {
    try {
      totalPrice =
        parseFloat(String(totalPrice).replace(/[^0-9.-]+/g, "")) || 0;
    } catch (e) {
      totalPrice = 0;
    }
  }

  if (totalPrice == null || totalPrice === 0) {
    totalPrice = quantity * (unitPrice || 0);
  }

  const id =
    read(raw, "id", "cartItemId", "cart_item_id") ||
    (productId ? `cart_${productId}` : `cart_${Date.now()}`);

  return {
    // keep original raw so debugging is easier
    original: raw,
    id,
    productId,
    product: {
      id: productId,
      name: productName,
      imageUrl: productImage,
    },
    unitPrice,
    quantity,
    totalPrice,
  };
};

// Async thunks for API calls
export const loadCartItems = createAsyncThunk(
  "cart/loadCartItems",
  async (providedUserId, { rejectWithValue }) => {
    try {
      // Nếu caller không truyền userId, thử lấy id của user hiện tại từ localStorage
      const userId = providedUserId ?? getCurrentUserId();

      if (!userId) {
        // Guest cart - load from localStorage
        const guestCart = getGuestCart();
        // Normalize guest cart items to canonical shape
        const normalizedGuest = (guestCart || [])
          .map(i => normalizeCartItem(i))
          .filter(Boolean);
        return {
          items: normalizedGuest,
          summary: {
            totalAmount: calculateGuestCartTotal(normalizedGuest),
            totalItems: calculateGuestCartItems(normalizedGuest),
          },
        };
      }
      const guestCart = getGuestCart();
      if (guestCart && guestCart.length > 0) {
        console.log("🧩 Found guest cart, merging into user cart...");

        // 📨 Gửi từng item lên backend
        for (const item of guestCart) {
          try {
            const productId =
              item.productId || item.product?.id || item.id || null;
            if (!productId) continue;

            const quantity = item.quantity || 1;
            await cartApi.addToCart(userId, productId, quantity);
          } catch (err) {
            console.warn("⚠️ Failed to merge item:", item, err);
          }
        }

        // ✅ Sau khi merge xong → Xóa guestCart
        localStorage.removeItem("guestCart");
      }
      // Nếu đã có userId (được truyền vào hoặc lấy từ localStorage), load từ DB
      let [items, summary] = await Promise.all([
        cartApi.getCartItems(userId),
        cartApi.getCartSummary(userId),
      ]);

      // Normalize possible response shapes from backend
      const normalizeItems = raw => {
        if (!raw) return [];
        if (Array.isArray(raw)) return raw;
        if (raw.items && Array.isArray(raw.items)) return raw.items;
        if (raw.data && Array.isArray(raw.data)) return raw.data;
        if (typeof raw === "object") return Object.values(raw);
        return [];
      };

      const normalizedItems = normalizeItems(items)
        .map(i => normalizeCartItem(i))
        .filter(Boolean);

      // Normalize summary: prefer backend summary, otherwise compute from items
      const normalizedSummary =
        summary &&
          typeof summary === "object" &&
          (summary.totalAmount !== undefined || summary.totalItems !== undefined)
          ? summary
          : {
            totalAmount: calculateGuestCartTotal(normalizedItems),
            totalItems: calculateGuestCartItems(normalizedItems),
          };

      return { items: normalizedItems, summary: normalizedSummary };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity, productData }, { rejectWithValue }) => {
    try {
      if (!userId) {
        // --- GUEST CART ---
        const guestCart = getGuestCart();
        const existingItem = guestCart.find(
          item => item.productId === productId
        );

        if (existingItem) {
          existingItem.quantity += quantity;
          // ... (logic cập nhật guest cart)
        } else {
          // ... (logic thêm mới guest cart)
          const newItem = {
            id: `guest_${productId}_${Date.now()}`,
            productId: productId,
            quantity: quantity,
            unitPrice: productData?.unitPrice || 0,
            totalPrice: productData?.unitPrice || 0,
            product: productData || {
              id: productId,
              name: "Unknown",
              imageUrl: "",
            },
          };
          guestCart.push(newItem);
        }

        saveGuestCart(guestCart);

        // Normalize guest cart TRƯỚC KHI return
        const normalizedGuest = (guestCart || [])
          .map(i => normalizeCartItem(i))
          .filter(Boolean);
        return {
          items: normalizedGuest,
          summary: {
            totalAmount: calculateGuestCartTotal(normalizedGuest),
            totalItems: calculateGuestCartItems(normalizedGuest),
          },
        };
      }

      // --- USER CART (ĐÃ SỬA) ---

      // 1. Gọi API để thêm
      await cartApi.addToCart(userId, productId, quantity);

      // 2. Fetch lại toàn bộ state mới (giống hệt loadCartItems)
      let [items, summary] = await Promise.all([
        cartApi.getCartItems(userId),
        cartApi.getCartSummary(userId),
      ]);

      // 3. Normalize data
      const normalizeItems = raw => {
        if (!raw) return [];
        if (Array.isArray(raw)) return raw;
        if (raw.items && Array.isArray(raw.items)) return raw.items;
        if (raw.data && Array.isArray(raw.data)) return raw.data;
        if (typeof raw === "object") return Object.values(raw);
        return [];
      };

      const normalizedItems = normalizeItems(items)
        .map(i => normalizeCartItem(i))
        .filter(Boolean);

      const normalizedSummary =
        summary &&
          typeof summary === "object" &&
          (summary.totalAmount !== undefined || summary.totalItems !== undefined)
          ? summary
          : {
            totalAmount: calculateGuestCartTotal(normalizedItems),
            totalItems: calculateGuestCartItems(normalizedItems),
          };

      // 4. Return payload chuẩn { items, summary }
      return { items: normalizedItems, summary: normalizedSummary };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      if (!userId) {
        // Guest cart - update in localStorage
        const guestCart = getGuestCart();
        const itemIndex = guestCart.findIndex(
          item => item.productId === productId
        );

        if (itemIndex !== -1) {
          if (quantity <= 0) {
            guestCart.splice(itemIndex, 1);
          } else {
            guestCart[itemIndex].quantity = quantity;
            // Đảm bảo unitPrice là number
            const parsedUnitPrice =
              typeof guestCart[itemIndex].unitPrice === "string"
                ? parseFloat(
                  String(guestCart[itemIndex].unitPrice).replace(
                    /[^\d.-]/g,
                    ""
                  )
                ) || 0
                : guestCart[itemIndex].unitPrice || 0;
            guestCart[itemIndex].unitPrice = parsedUnitPrice;
            guestCart[itemIndex].totalPrice = quantity * parsedUnitPrice;
          }

          saveGuestCart(guestCart);
          return {
            items: guestCart,
            summary: {
              totalAmount: calculateGuestCartTotal(guestCart),
              totalItems: calculateGuestCartItems(guestCart),
            },
          };
        }
        return null;
      }

      if (quantity <= 0) {
        await cartApi.removeFromCart(userId, productId);
      } else {
        await cartApi.updateCartItemQuantity(userId, productId, quantity);
      }

      // 🔽 **FIX: Thay vì 'getCartByUserId', fetch lại toàn bộ cart như loadCartItems**
      let [items, summary] = await Promise.all([
        cartApi.getCartItems(userId),
        cartApi.getCartSummary(userId),
      ]);

      const normalizeItems = raw => {
        if (!raw) return [];
        if (Array.isArray(raw)) return raw;
        if (raw.items && Array.isArray(raw.items)) return raw.items;
        if (raw.data && Array.isArray(raw.data)) return raw.data;
        if (typeof raw === "object") return Object.values(raw);
        return [];
      };

      const normalizedItems = normalizeItems(items)
        .map(i => normalizeCartItem(i))
        .filter(Boolean);

      const normalizedSummary =
        summary &&
          typeof summary === "object" &&
          (summary.totalAmount !== undefined || summary.totalItems !== undefined)
          ? summary
          : {
            totalAmount: calculateGuestCartTotal(normalizedItems),
            totalItems: calculateGuestCartItems(normalizedItems),
          };

      return { items: normalizedItems, summary: normalizedSummary };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      if (!userId) {
        // Guest cart - remove from localStorage
        const guestCart = getGuestCart();
        const filteredCart = guestCart.filter(
          item => item.productId !== productId
        );
        saveGuestCart(filteredCart);
        return {
          items: filteredCart,
          summary: {
            totalAmount: calculateGuestCartTotal(filteredCart),
            totalItems: calculateGuestCartItems(filteredCart),
          },
        };
      }

      await cartApi.removeFromCart(userId, productId);

      // 🔽 **FIX: Thay vì 'return productId', fetch lại toàn bộ cart như loadCartItems**
      let [items, summary] = await Promise.all([
        cartApi.getCartItems(userId),
        cartApi.getCartSummary(userId),
      ]);

      const normalizeItems = raw => {
        if (!raw) return [];
        if (Array.isArray(raw)) return raw;
        if (raw.items && Array.isArray(raw.items)) return raw.items;
        if (raw.data && Array.isArray(raw.data)) return raw.data;
        if (typeof raw === "object") return Object.values(raw);
        return [];
      };

      const normalizedItems = normalizeItems(items)
        .map(i => normalizeCartItem(i))
        .filter(Boolean);

      const normalizedSummary =
        summary &&
          typeof summary === "object" &&
          (summary.totalAmount !== undefined || summary.totalItems !== undefined)
          ? summary
          : {
            totalAmount: calculateGuestCartTotal(normalizedItems),
            totalItems: calculateGuestCartItems(normalizedItems),
          };

      return { items: normalizedItems, summary: normalizedSummary };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) {
        // Guest cart - clear localStorage
        saveGuestCart([]);
        return {
          items: [],
          summary: {
            totalAmount: 0,
            totalItems: 0,
          },
        };
      }

      await cartApi.clearCart(userId);
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    cartSummary: null,
    loading: false,
    error: null,
    // needsRefresh: false,
  },
  reducers: {
    // Clear error
    clearError: state => {
      state.error = null;
    },
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // triggerCartRefresh: state => {
    //   state.needsRefresh = !state.needsRefresh;
    // },
  },
  extraReducers: builder => {
    builder
      // Load cart items
      .addCase(loadCartItems.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload.items;
        state.cartSummary = action.payload.summary;
      })
      .addCase(loadCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to cart
      .addCase(addToCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        // Update state with new cart data (for both guest and user cart)
        if (action.payload && action.payload.items && action.payload.summary) {
          state.carts = action.payload.items;
          state.cartSummary = action.payload.summary;
        } else {
          console.warn("⚠️ addToCart: Payload không hợp lệ!", action.payload);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update cart item quantity
      .addCase(updateCartItemQuantity.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.items && action.payload.summary) {
          state.carts = action.payload.items;
          state.cartSummary = action.payload.summary;
        } else {
          console.warn(
            "⚠️ updateCartItemQuantity: Payload không hợp lệ!",
            action.payload
          );
        }
        // const updatedItem = action.payload;

        // // ✅ Nếu payload có items (sau khi fetch toàn bộ giỏ hàng)
        // if (
        //   updatedItem.items &&
        //   updatedItem.items.length > 0 &&
        //   updatedItem.summary
        // ) {
        //   state.carts = updatedItem.items;
        //   state.cartSummary = updatedItem.summary;
        // }
        // // ❌ Nếu payload rỗng (fetch lỗi hoặc delay), giữ nguyên state
        // else if (!updatedItem.items || updatedItem.items.length === 0) {
        //   console.warn("⚠️ Payload rỗng, giữ nguyên giỏ hàng cũ");
        // }

        // // ✅ Cập nhật tổng lại mỗi lần
        // state.cartSummary = {
        //   totalItems: state.carts.reduce(
        //     (sum, item) => sum + (item.quantity || 0),
        //     0
        //   ),
        //   totalAmount: state.carts.reduce(
        //     (sum, item) => sum + (item.totalPrice || 0),
        //     0
        //   ),
        // };
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove from cart
      .addCase(removeFromCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.items && action.payload.summary) {
          state.carts = action.payload.items;
          state.cartSummary = action.payload.summary;
        } else {
          console.warn(
            "⚠️ removeFromCart: Payload không hợp lệ!",
            action.payload
          );
        }
        // Update state with new cart data (for both guest and user cart)
        // if (action.payload.items) {
        //   state.carts = action.payload.items;
        //   state.cartSummary = action.payload.summary;
        // } else {
        //   // Fallback: remove by productId
        //   state.carts = state.carts.filter(
        //     item => item.product?.id !== action.payload
        //   );
        // }
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Clear cart
      .addCase(clearCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, state => {
        state.loading = false;
        state.carts = [];
        state.cartSummary = null;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setLoading } = cartSlice.actions;

export default cartSlice.reducer;