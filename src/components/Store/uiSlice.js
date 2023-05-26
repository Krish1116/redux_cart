import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { isCartOpen: false, notfication: null };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialCartState,
  reducers: {
    toggle(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    setNotification(state, action) {
      state.notfication = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiAction = uiSlice.actions;
export default uiSlice.reducer;
