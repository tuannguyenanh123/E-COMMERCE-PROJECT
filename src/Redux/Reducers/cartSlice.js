import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  // cartItems info product of user bought + user
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTitleQuantity: 0,
  cartTotalAmount: 0,
};

export const fetchHistoryOrder = createAsyncThunk(
  "cart/fetchHistoryOrder",
  async () => {
    const cart = await axios
      .get("http://localhost:3001/history")
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return cart;
  }
);
export const addHistoryOrder = createAsyncThunk(
  "cart/addHistoryOrder",
  async (payload) => {
    const cart = await axios
      .post("http://localhost:3001/history", payload)
      .then((result) => {
        // return result.data;
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    return cart;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log(action.payload);
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity +=
          action.payload.quantityProduct;
        toast.info(
          `Đã thêm số lượng ${state.cartItems[itemIndex].title} vào giỏ`,
          {
            style: {
              color: "white",
            },
          }
        );
      } else {
        const tempProduct = {
          ...action.payload,
          cartQuantity: action.payload.quantityProduct,
        };
        state.cartItems.push(tempProduct);
        toast.success(`Vừa thêm ${action.payload.title} vào giỏ hàng`);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateSizeInCartItems(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      state.cartItems[itemIndex] = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`Xóa ${action.payload.title} khỏi giỏ hàng`);
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.error(`Giảm 1 ${action.payload.title} trong giỏ hàng`);
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
        toast.error(`Xóa ${action.payload.title} khỏi giỏ hàng`);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  updateSizeInCartItems,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
