import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./Features/menuSlice";
import toolboxReducer from "./Features/toolboxSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    toolbox: toolboxReducer,
  },
});
