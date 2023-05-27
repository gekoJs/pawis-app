import { configureStore } from "@reduxjs/toolkit";
import displayTrigger from "./displayTrigger";

export const store = configureStore({
  reducer: {
    display: displayTrigger
  },
});
