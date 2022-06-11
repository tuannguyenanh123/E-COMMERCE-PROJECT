import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  listUser: [],
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  userName: localStorage.getItem("userName")
    ? JSON.parse(localStorage.getItem("userName"))
    : null,
  paymentInfo: null,
  detailOrderUserAfterDiscount: null,
  listErrorSubmit: null,
  errorLogin: null,
};
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const user = await axios
    .get("http://localhost:3001/user")
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return user;
});
export const addUsers = createAsyncThunk("user/addUsers", async (payload) => {
  const user = await axios
    .post("http://localhost:3001/user", payload)
    .then((result) => {
      // return result.data;
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
  return user;
});
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    getUserName(state, action) {
      state.userName = action.payload;
      localStorage.setItem("userName", JSON.stringify(state.userName));
    },
    logout: (state) => {
      state.user = null;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    savePaymentInfo: (state, action) => {
      state.paymentInfo = action.payload;
      localStorage.setItem("userInfoOrder", JSON.stringify(state.paymentInfo));
    },
    detailOrderUserDone: (state, action) => {
      console.log(action.payload);
      state.detailOrderUserAfterDiscount = action.payload;
    },
    saveError: (state, action) => {
      state.listErrorSubmit = action.payload;
    },
    handleErrorLogin: (state, action) => {
      state.errorLogin = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        console.log({ state, action });
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log({ state, action });
        state.listUser = [...action.payload];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.log({ state, action });
      })
      .addCase(addUsers.pending, (state, action) => {
        console.log({ state, action });
      })
      .addCase(addUsers.fulfilled, (state, action) => {
        console.log({ state, action });
      })
      .addCase(addUsers.rejected, (state, action) => {
        console.log({ state, action });
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  getUserName,
  savePaymentInfo,
  detailOrderUserDone,
  saveError,
  handleErrorLogin,
} = userSlice.actions;

export default userSlice.reducer;
