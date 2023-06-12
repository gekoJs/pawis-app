import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filtered_dogs: [],
};

export const dataDogs = createSlice({
  name: "dataDogs",
  initialState,
  reducers: {
    addFilteredDogs: (state, action) => {
      state.filtered_dogs = action.payload;
    },
  },
});

export const { addFilteredDogs } = dataDogs.actions;

export default dataDogs.reducer;
