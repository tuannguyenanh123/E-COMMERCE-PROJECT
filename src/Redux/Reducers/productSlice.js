import { createSlice } from "@reduxjs/toolkit";

import { product_data } from "./../../UI/Components/Product/Product_data";

const initialState = {
  productToDetail: null,
  products: product_data,
  keyWordSearch: "",
};

export const productToDetailSlice = createSlice({
  name: "productToDetail",
  initialState,
  reducers: {
    transProductToDetail(state, action) {
      state.productToDetail = action.payload;
      console.log(state);
    },
    filter(state, action) {
      // const filteredData = product_data.filter(
      //   (product) => product.categorySlug === action.payload
      // );
      const filteredData = product_data.filter((val) => {
        if (
          val.categorySlug.toLowerCase().includes(action.payload.toLowerCase())
        ) {
          return val;
        }
      });
      state.products = filteredData;
    },
    keyWordSearchProduct(state, action) {
      state.keyWordSearch = action.payload;
      console.log(action.payload);
    },
    filterProductByPrice(state, action) {
      const filteredData = product_data.filter((val) => {
        return (
          val.price > parseInt(action.payload[0], 10) &&
          val.price < parseInt(action.payload[1], 10)
        );
      });
      state.products = filteredData;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  transProductToDetail,
  filter,
  keyWordSearchProduct,
  filterProductByPrice,
} = productToDetailSlice.actions;

export default productToDetailSlice.reducer;
