import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: {
    showSideBar: false,
    showOptions: false,
  },
};

export const appSlice = createSlice({
  name: "appReducer",
  initialState,
  reducers: {
    showSideBarOrOptions: (state, action) => {
      state.isShow = action.payload;
      console.log(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { showSideBarOrOptions } = appSlice.actions;

export default appSlice.reducer;
