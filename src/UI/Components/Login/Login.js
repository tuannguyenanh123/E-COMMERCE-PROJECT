import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";

// import {
//   getAuth,
//   signInWithPhoneNumber,
//   RecaptchaVerifier,
// } from "firebase/auth";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";

import "./Login.scss";
import AnimatedPage from "../AnimatedPage/AnimatedPage";
import {
  login,
  getUserName,
  fetchUsers,
  handleErrorLogin,
} from "./../../../Redux/Reducers/userSlice";

const clientId =
  "418049852843-l4987c4p5ng631qt9rp2nf2n659sn2ma.apps.googleusercontent.com";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchUsers());
  }, []);
  useEffect(() => {
    return () => {
      dispatch(handleErrorLogin(null));
    };
  }, []);
  const dispatch = useDispatch();
  const countryCode = "+84";
  const [phoneNumberState, setPhoneNumberState] = useState(countryCode);
  // const [expandForm, setExpandForm] = useState(false);
  const navigate = useNavigate();
  const listUser = useSelector((state) => state.user.listUser);
  const onSignInSubmit = () => {
    console.log(">>");
    if (phoneNumberState.length === 10) {
      for (let i = 0; i < listUser.length; i++) {
        console.log(listUser);
        const element = listUser[i];
        if (element.phone === phoneNumberState) {
          dispatch(login(true));
          dispatch(getUserName(element));
          console.log("đã đăng nhập");
          navigate("/");
        } else {
          dispatch(handleErrorLogin("số điện thoại này chưa được đăng kí"));
        }
      }
    } else {
      console.log(">>>");
      dispatch(handleErrorLogin("số điện thoại không hợp lệ"));
    }
    //   // console.log(navigate(-1));
    // }
    // dispatch(handleErrorLogin(null));
  };
  const onSuccess = (res) => {
    // console.log("LOGIN SUCCESS! current user: " + res.profileObj);
  };
  const onFailure = (res) => {
    // console.log(res);
  };
  const errorLoginText = useSelector((state) => state.user.errorLogin);
  return (
    <AnimatedPage>
      <div className="content-main login">
        <div className="login">
          <div className="heading-title">
            ĐĂNG NHẬP / TẠO TÀI KHOẢN / LẤY LẠI MẬT KHẨU
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={16} md={8}>
                <div id="sign-in-button"></div>
                <div className="login-content-1">
                  <h2>KHÁCH HÀNG HIỆN TẠI TRÊN MRSIMPLE.VN</h2>
                  <p>Nhập số điện thoại của quý khách để đăng nhập.</p>
                  {errorLoginText ? (
                    <span className="error">{errorLoginText}</span>
                  ) : null}
                  <div className="form">
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "25ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        className="form-login"
                        label="Điện thoại"
                        variant="standard"
                        color="primary"
                        type="number"
                        value={phoneNumberState}
                        onChange={(e) => {
                          setPhoneNumberState(e.target.value);
                        }}
                        focused
                      />
                    </Box>
                  </div>
                  {/* <GoogleLogin
                    clientId={clientId}
                    buttonText="Đăng nhập với Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={"single_host_origin"}
                    // isSignedIn={true}
                  /> */}
                  <span
                    className="button-login-reg"
                    style={{
                      paddingTop: "20px",
                    }}
                  >
                    <button
                      type="button"
                      className="button-login-reg-detail"
                      onClick={onSignInSubmit}
                    >
                      <span>ĐĂNG NHẬP</span>
                    </button>
                  </span>
                </div>
              </Grid>
              <Grid item xs={16} md={8} className="guest-new">
                <div className="login-content-2">
                  <h2>KHÁCH HÀNG MỚI TRÊN MRSIMPLE.VN</h2>
                  <p>
                    Nếu quý khách vẫn chưa có tài khoản trên <b>mrsimple.vn</b>,
                    hãy sử dụng tùy chọn này để truy cập biểu mẫu đăng ký.
                  </p>
                  <p>
                    Bằng cách cung cấp cho chúng tôi thông tin chi tiết của quý
                    khách, quá trình mua hàng trên <b>mrsimple.vn</b> sẽ là một
                    trải nghiệm thú vị và nhanh chóng hơn.
                  </p>
                  <span className="button-login-reg">
                    <button type="button" className="button-login-reg-detail">
                      <span>
                        <Link to="/register">TẠO TÀI KHOẢN</Link>
                      </span>
                    </button>
                  </span>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Login;
