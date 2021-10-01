import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basket: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.basket.push(action.payload);
    },
    removeProduct: (state, action) => {
      const index = state.basket.findIndex(
        (product) => product.id === action.payload.id
      );
      state.basket.splice(index, 1);
    },

    emptyBasket: (state) => {
      state.basket = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, emptyBasket } = productSlice.actions;
export const getNumberOfProductInBasket = (state) =>
  state.product.basket.length;
export const getPriceOfProductsInBasket = (state) =>
  state.product.basket.reduce(
    (amount, product) => amount + parseInt(product.price),
    0
  );
export const getProductsInTheBasket = (state) => state.product.basket;

export default productSlice.reducer;
