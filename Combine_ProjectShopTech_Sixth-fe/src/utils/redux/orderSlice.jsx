import { createSlice } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    setOrders: (state, action) => {
      state.orders = action.payload; // Cập nhật toàn bộ danh sách đơn hàng
    },
  },
});

export const { addOrder, setOrders } = orderSlice.actions;
export default orderSlice.reducer;
// Updated: 2025-10-12T16:06:37.615Z

// Updated: 2025-10-12T16:08:50.971Z