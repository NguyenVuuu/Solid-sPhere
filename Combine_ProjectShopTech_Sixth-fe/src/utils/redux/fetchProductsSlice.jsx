import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProducts } from '../../services/MockProductService';
import { useTranslation } from 'react-i18next';

// Thực hiện fetch sản phẩm từ Mock Data
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await getAllProducts();
    if (response.EC !== 1) {
      throw new Error("Failed to fetch products");
    }
    return response.DT.map((item) => ({
      ...item,
      inStock: item.stock > 0 ? true : false,
    }));
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;

// Updated: 2025-10-12T16:06:26.954Z

// Updated: 2025-10-12T16:09:04.968Z
