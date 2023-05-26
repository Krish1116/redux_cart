import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { items: [], totalQuantity: 0, changed: false };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      // the payload property which redux toolkit sets for us which contains any extra data you add it to the action.
      const newItem = action.payload;
      state.changed = true;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemToCart(state, action) {
      const id = action.payload;
      state.totalQuantity--;
      state.changed = true;
      const existingItem = state.items.find((item) => item.id === id);
      if (!existingItem) {
        return state;
      }
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
