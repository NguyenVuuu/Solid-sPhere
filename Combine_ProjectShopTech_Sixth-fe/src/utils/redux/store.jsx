import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productsReducer from "./fetchProductsSlice";
import orderReducer from "./orderSlice";
import { useTranslation } from 'react-i18next';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    orders: orderReducer,
  },
   devTools: process.env.NODE_ENV !== "production",
});

export default store;

// Updated: 2025-10-12T16:06:26.532Z

// Updated: 2025-10-12T16:08:58.808Z
