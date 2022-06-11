import { configureStore } from "@reduxjs/toolkit";

import userSlice from "../Reducers/userSlice";
import appSlice from "./../Reducers/appSlice";
import cartSlice from "./../Reducers/cartSlice";
import productToDetailSlice from "./../Reducers/productSlice";

const store = configureStore({
  reducer: {
    appReducer: appSlice,
    cart: cartSlice,
    productToDetail: productToDetailSlice,
    user: userSlice,
  },
});

export default store;
