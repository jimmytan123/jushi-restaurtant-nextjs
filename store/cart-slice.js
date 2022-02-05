import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      //console.log(newItem);

      // find if the item already been in the cart
      const existingItem = state.items.find((item) => item.id === newItem.id);

      // if the item does not exist in the cart, push the item into the array
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          quantity: newItem.quantity,
          price: newItem.price,
          totalPrice: newItem.price * newItem.quantity,
        });
      } else {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice += newItem.price * newItem.quantity;
      }

      state.totalQuantity += newItem.quantity;
      state.totalAmount = state.totalAmount + newItem.price * newItem.quantity;
    },
    resetCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
