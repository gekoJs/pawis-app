import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // filtered_dogs: [],
  allDogs: {},
  loading: false,
};

export const dataDogs = createSlice({
  name: "dataDogs",
  initialState,
  reducers: {
    // addFilteredDogs: (state, action) => {
    //   state.filtered_dogs = action.payload;
    // },
    addAllDogs: (state, action) => {
      state.allDogs = action.payload;
      console.log("action.type", action.type);
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addAllDogs, loading } = dataDogs.actions;

export default dataDogs.reducer;
