import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { isCartOpen: false };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialCartState,
  reducers: {
    toggle(state) {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const uiAction = uiSlice.actions;
export default uiSlice.reducer;
