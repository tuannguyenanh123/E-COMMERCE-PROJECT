import React, { useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import RadioGroup from "@mui/material/RadioGroup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillCaretDown } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { nanoid } from "nanoid";

import "./Payment.scss";
import { coupon, paymentMethod } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  detailOrderUserDone,
  savePaymentInfo,
} from "../../../Redux/Reducers/userSlice";
import {
  checkProperties,
  getTotalPrice,
  priceAfterDiscount,
} from "../../../Utilities/index";
import { addHistoryOrder, clearCart } from "../../../Redux/Reducers/cartSlice";

const ariaLabel = { "aria-label": "description" };

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#999C03",
      contrastText: "#fff",
    },
  },
});

const Payment = () => {
  // check login
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== true) {
      navigate("/login");
    }
  }, []);

  const [expanded, setExpanded] = useState(false);
  const nPhone = useSelector((state) => state.user.userName);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // state form large
  const [values, setValues] = useState({
    userName: nPhone.userName,
    phoneNumber: nPhone.phone,
    country: "",
    district: "",
    address: "",
    email: nPhone.mail,
    yourCoupon: "",
    coupon: "",
    otherRequest: "",
    methodTrans: true,
    methodPay: true,
    isAgree: false,
  });
  // api province
  const [dataProvinceDis, setDataProvinceDis] = useState({
    provinces: [],
    districts: [],
  });
  const getCodeContry = (textContent) => {
    return dataProvinceDis.provinces.find(
      (province) => province.name === textContent
    );
  };
  useEffect(() => {
    axios
      .get("https://api.mysupership.vn/v1/partner/areas/province")
      .then((res) => {
        setDataProvinceDis({
          ...dataProvinceDis,
          provinces: res.data.results,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChangeProvince = (e) => {
    setValues({
      ...values,
      country: getCodeContry(e.target.textContent).name,
      district: "",
    });
    axios
      .get(
        `https://api.mysupership.vn/v1/partner/areas/district?province=${
          getCodeContry(e.target.textContent).code
        }`
      )
      .then((res) =>
        setDataProvinceDis({ ...dataProvinceDis, districts: res.data.results })
      )
      .catch((error) => console.log(error));
  };

  const handleChangeDistrict = (e) => {
    setValues({
      ...values,
      district: e.target.textContent,
    });
  };
  const [errors, setErrors] = useState();
  const onPaymentInfoSubmit = () => {
    if (checkProperties(values).length > 0) {
      setErrors(checkProperties(values));
    } else {
      dispatch(savePaymentInfo(values));
      navigate("/order-completed");
    }
    const itemOrdered = JSON.parse(localStorage.getItem("cartItems"));
    const userOrdered = JSON.parse(localStorage.getItem("userName"));
    console.log(userOrdered);

    // save purchase history info into json server
    dispatch(
      addHistoryOrder({
        id: nanoid(),
        phone: userOrdered.phone,
        items: itemOrdered,
      })
    );
    dispatch(clearCart());
  };
  const cart = useSelector((state) => state.cart).cartItems;
  const handleChangeCoupon = (e) => {
    if (priceAfterDiscount(cart, coupon, e.target.value) === false) {
      dispatch(
        detailOrderUserDone({
          coupon: e.target.value,
          priceDiscount: getTotalPrice(cart),
          isCoupon: false,
        })
      );
      setValues({
        ...values,
        coupon: e.target.value,
      });
    } else {
      console.log("có discount");
      dispatch(
        detailOrderUserDone({
          coupon: e.target.value,
          priceDiscount: priceAfterDiscount(cart, coupon, e.target.value),
          isCoupon: true,
        })
      );
      setValues({
        ...values,
        coupon: e.target.value,
      });
    }
  };
  return (
    <div className="payment">
      <div className="section-payment">
        <div className="form-group">
          <div className="heading-title">THÔNG TIN GIAO HÀNG</div>
          {Array.isArray(errors) ? (
            <div className="field--error">
              {errors?.map((error, index) => (
                <>
                  <span className="error--item" key={index}>
                    Trường {error} không được bỏ trống.
                  </span>
                  <br />
                </>
              ))}
              <IoCloseSharp
                onClick={() => {
                  setErrors();
                }}
              />
            </div>
          ) : null}

          <div className="shipping-info content">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <ThemeProvider theme={theme}>
                    <label>Họ và tên:</label>
                    <Box component="form" autoComplete="off">
                      <Input
                        autoFocus
                        name="name"
                        inputProps={ariaLabel}
                        sx={{
                          "& > :not(style)": { m: 1 },
                        }}
                        color="neutral"
                        className="formInput"
                        value={values.userName}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            userName: e.target.value,
                          })
                        }
                      />
                    </Box>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <label>Tỉnh / Thành phố:</label>
                    <Box component="form" autoComplete="off">
                      <Input
                        name="country"
                        inputProps={ariaLabel}
                        sx={{
                          "& > :not(style)": { m: 1 },
                        }}
                        color="neutral"
                        className="formInput country"
                        value={values.country ? values.country : ""}
                      ></Input>
                      <AiFillCaretDown className="down" />
                      <div className="droplist">
                        {dataProvinceDis.provinces.map((province, index) => (
                          <div
                            className="droplist__item"
                            key={index}
                            onClick={(e) => {
                              handleChangeProvince(e);
                            }}
                          >
                            {province.name}
                          </div>
                        ))}
                      </div>
                    </Box>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <label>Địa chỉ:</label>
                    <Box component="form" autoComplete="off">
                      <Input
                        name="address"
                        inputProps={ariaLabel}
                        sx={{
                          "& > :not(style)": { m: 1 },
                        }}
                        color="neutral"
                        className="formInput"
                        value={values.address}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            address: e.target.value,
                          })
                        }
                      />
                    </Box>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <label>Mã khuyến mãi của bạn:</label>
                    <Box component="form" autoComplete="off">
                      <Input
                        name="yourcoupon"
                        inputProps={ariaLabel}
                        sx={{
                          "& > :not(style)": { m: 1 },
                        }}
                        color="neutral"
                        className="formInput"
                        onChange={(e) =>
                          setValues({
                            ...values,
                            yourCoupon: e.target.value,
                          })
                        }
                      />
                    </Box>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <label>Mã khuyến mãi:</label>
                    <Box component="form" autoComplete="off">
                      <Input
                        name="coupon"
                        inputProps={ariaLabel}
                        sx={{
                          "& > :not(style)": { m: 1 },
                        }}
                        color="neutral"
                        className="formInput"
                        onChange={(e) => handleChangeCoupon(e)}
                      />
                    </Box>
                  </ThemeProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ThemeProvider theme={theme}>
                    <label>Điện thoại:</label>
                    <Box component="form" autoComplete="off">
                      <Input
                        type="number"
                        name="phone"
                        inputProps={ariaLabel}
                        sx={{
                          "& > :not(style)": { m: 1 },
                        }}
                        color="neutral"
                        className="formInput"
                        value={values.phoneNumber}
                        onChange={(e) =>
                          setValues({ ...values, phoneNumber: e.target.value })
                        }
                      />
                    </Box>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <label>Quận / Huyện:</label>
                    <Box component="form" autoComplete="off">
                      <Input
                        name="district"
                        inputProps={ariaLabel}
                        sx={{
                          "& > :not(style)": { m: 1 },
                        }}
                        color="neutral"
                        className="formInput"
                        value={values.district ? values.district : ""}
                      />
                      <AiFillCaretDown className="down" />
                      <div className="droplist">
                        {dataProvinceDis.districts.map((district, index) => (
                          <div
                            className="droplist__item"
                            key={index}
                            onClick={(e) => {
                              handleChangeDistrict(e);
                            }}
                          >
                            {district.name}
                          </div>
                        ))}
                      </div>
                    </Box>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <label>Email:</label>
                    <Box component="form" autoComplete="off">
                      <Input
                        type="email"
                        name="email"
                        inputProps={ariaLabel}
                        sx={{
                          "& > :not(style)": { m: 1 },
                        }}
                        color="neutral"
                        className="formInput"
                        value={values.email}
                        onChange={(e) =>
                          setValues({ ...values, email: e.target.value })
                        }
                      />
                    </Box>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <label>Giảm giá thẻ thành viên (0 lần):</label>
                    <br />
                    <br />
                    <label>
                      Bạn đã hết số lần được sử dụng giảm giá từ thẻ thành viên
                    </label>
                  </ThemeProvider>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <label>Yêu cầu khác:</label>
                  <br />
                  <br />
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={6}
                    style={{ width: "100%" }}
                    className="other-requirement"
                    value={values.otherRequest}
                    onChange={(e) =>
                      setValues({ ...values, otherRequest: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </div>
          <div className="heading-title">PHƯƠNG THỨC VẬN CHUYỂN</div>
          <div className="payment-method content price">
            <FormControlLabel
              name="methodTrans"
              defaultValue="other"
              value="other"
              control={
                <Radio
                  onChange={(e) =>
                    setValues({ ...values, methodTrans: e.target.checked })
                  }
                />
              }
              label="Giao hàng tiêu chuẩn 25,000"
              className="price-payment-content"
            />
            <span className="price-symbol">&#8363;</span>
          </div>
          <div className="heading-title">PHƯƠNG THỨC THANH TOÁN</div>
          <div className="payment-method last-content">
            <div className="accordion">
              <RadioGroup>
                {paymentMethod.map((item, index) => (
                  <Accordion
                    expanded={expanded === item.title}
                    onChange={handleChange(item.title)}
                    key={index}
                  >
                    <AccordionSummary
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <FormControlLabel
                        value={item.title}
                        control={
                          <Radio
                            onChange={(e) =>
                              setValues({
                                ...values,
                                methodPay: e.target.checked,
                              })
                            }
                          />
                        }
                        label={item.title}
                        name="methodPay"
                      />
                    </AccordionSummary>
                    <AccordionDetails
                      style={{
                        backgroundColor: "#dafde2",
                      }}
                    >
                      {item.content ? (
                        <ul>
                          <li>{item.content?.stk}</li>
                          <br />
                          <li>{item.content?.stkName}</li>
                          <br />
                          <li>{item.content?.bankName}</li>
                          <br />
                          <li>{item.content?.title}</li>
                          <br />
                          <li>
                            <span>{item.content?.subTitle.name}</span>
                            <br />
                            <br />
                            <span>{item.content?.subTitle.phoneNumber}</span>
                            <br />
                            <br />
                            <span>{item.content?.subTitle.add}</span>
                          </li>
                          <br />
                        </ul>
                      ) : (
                        ""
                      )}
                      {item.noti}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </RadioGroup>
            </div>
          </div>
          <div className="pass content">
            <input
              type="checkbox"
              id="isAgree"
              name="isAgree"
              onChange={(e) =>
                setValues({ ...values, isAgree: e.target.checked })
              }
            />
            <label htmlFor="isAgree">
              Tôi đã đọc và đồng ý CHÍNH SÁCH ĐỔI HÀNG & VẬN CHUYỂN HÀNG
            </label>
          </div>
          <div className="actions ">
            <span
              className="button-login-reg"
              style={{
                paddingTop: "20px",
              }}
            >
              <button
                type="button"
                className="button-login-reg-detail"
                // onClick={onSignInSubmit}
              >
                <span>
                  <Link to="/product">TIẾP TỤC MUA HÀNG</Link>
                </span>
              </button>
            </span>
            <span
              className="button-login-reg"
              style={{
                paddingTop: "20px",
              }}
            >
              <button
                type="button"
                className="button-login-reg-detail"
                onClick={onPaymentInfoSubmit}
              >
                <span>THANH TOÁN</span>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Payment;
