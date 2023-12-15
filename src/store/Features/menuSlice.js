import { MENU_ITEMS } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeMenuItem: MENU_ITEMS.PENCIL,
  actionMenuItem: null,
  filled: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    menuItemClick: (state, action) => ({
      ...state,
      activeMenuItem: action.payload,
    }),
    actionItemClick: (state, action) => ({
      ...state,
      actionMenuItem: action.payload,
    }),
    toggleFill: (state, action) => ({
      ...state,
      filled: !state.filled,
    }),
  },
});

export const { menuItemClick, actionItemClick, toggleFill } = menuSlice.actions;

export default menuSlice.reducer;
