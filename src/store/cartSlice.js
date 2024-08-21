import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  subTotal: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addedToCart: (state, action) => {
      const item = action.payload;
      const isItemAdded = state.cartItems.find((i) => i.id === item.id);
      if (isItemAdded) {
        state.cartItems.forEach((i) => {
          if (item.id === i.id) i.quantity += 1;
        });
      } else {
        state.cartItems.push(item);
      }
    },
    decrement: (state , action) => {
      const item = state.cartItems.find(i => i.id === action.payload)
      if (item.quantity > 1) {
        state.cartItems.forEach((i) => {
          if (item.id === i.id) i.quantity -= 1;
        });
      }
    },
    removeFromCart: (state , action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload)
    }
  },
});

export const { addedToCart, increment, decrement , removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
