import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    user: userSlice,
  },
});
