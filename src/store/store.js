import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./Features/menuSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
});
