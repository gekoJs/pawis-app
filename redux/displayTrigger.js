import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  display_loader: true,
  display_message: false,
};

export const displayTrigger = createSlice({
  name: "display",
  initialState,
  reducers: {
    loader_active_fn: (state, action) => {
      state.display_loader = action.payload;
    },
    message_active_fn: (state, action) => {
      state.display_message = action.payload;
    },
  },
});

export const { loader_active_fn, message_active_fn } = displayTrigger.actions;

export default displayTrigger.reducer;
