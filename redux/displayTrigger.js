import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  display_loader: true,
};

export const displayTrigger = createSlice({
  name: "display",
  initialState,
  reducers: {
    loader_active_fn: (state, action) => {
      state.display_loader = action.payload;
    },
  },
});

export const { loader_active_fn } = displayTrigger.actions;

export default displayTrigger.reducer;
