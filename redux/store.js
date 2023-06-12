import { configureStore } from "@reduxjs/toolkit";
import displayTrigger from "./displayTrigger";
import dataDogs from "./dogs";

export const store = configureStore({
  reducer: {
    display: displayTrigger,
    dataDogs: dataDogs,
  },
});
