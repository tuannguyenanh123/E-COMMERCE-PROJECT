import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";

import "./Cart.scss";
import { totalProduct } from "./../../../Utilities/index";
import {
  removeFromCart,
  decreaseCart,
  addToCart,
  updateSizeInCartItems,
} from "./../../../Redux/Reducers/cartSlice";
import AnimatedPage from "../AnimatedPage/AnimatedPage";

const Cart = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user);
  const [age, setAge] = useState(10);
  const dispatch = useDispatch();
  const handleChange = (event, cartItem) => {
    dispatch(
      updateSizeInCartItems({
        ...cartItem,
        sizeProduct: defineSizeInver(
          event.target.value ? event.target.value : age
        ),
      })
    );
    setAge(event.target.value);
  };
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };
  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };
  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };
  const handleContinueCart = () => {
    if (user) {
      navigate("/payment");
    } else {
      navigate("/login");
    }
  };
  const defineSizeInver = (sizeNumber) => {
    switch (sizeNumber) {
      case 10:
        return "S";
        break;
      case 20:
        return "M";
        break;
      case 30:
        return "L";
        break;
      case 40:
        return "XL";
        break;
      case 50:
        return "XXL";
        break;
      case 60:
        return "XXXL";
        break;
      default:
        break;
    }
  };
  const defineSize = (size) => {
    switch (size) {
      case "S":
        return 10;
        break;
      case "M":
        return 20;
        break;
      case "L":
        return 30;
        break;
      case "XL":
        return 40;
        break;
      case "XXL":
        return 50;
        break;
      case "XXXL":
        return 60;
        break;
      default:
        break;
    }
  };
  return (
    <>
      <AnimatedPage>
        <div className="cart-section cart">
          <h1 className="cart-title">GIỎ HÀNG</h1>
          <div className="cart-content">
            {cart.cartItems.length === 0 ? (
              <div className="cart-empty">
                <p>Your cart is currently empty</p>
                <div className="start-shopping">
                  <Link to="/product">
                    <MdKeyboardBackspace />
                    <span>Start Shopping</span>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <Box>
                  <Grid container spacing={2} className="titles">
                    <Grid item xs={2}>
                      <span className="product--title title">Sản phẩm</span>
                    </Grid>
                    <Grid item xs={3}>
                      <span className="product--description title">Mô tả</span>
                    </Grid>
                    <Grid item xs={2}>
                      <span className="product--size title">Size</span>
                    </Grid>
                    <Grid item xs={1}>
                      <span className="product--quantity title">Đơn vị</span>
                    </Grid>
                    <Grid item xs={1}>
                      <span className="product--total title">Số tiền</span>
                    </Grid>
                    <Grid item xs={2}>
                      <span className="product--status title">Trạng thái</span>
                    </Grid>
                    <Grid item xs={1}>
                      <span className="product--cleart title">Xóa</span>
                    </Grid>
                  </Grid>
                </Box>
                <div className="cart-items">
                  <Box>
                    {cart.cartItems?.map((cartItem, index) => (
                      <Grid
                        container
                        spacing={2}
                        className="cart-item"
                        key={index}
                      >
                        <Grid item xs={2}>
                          <div className="cart-product">
                            <img src={cartItem.image} alt={cartItem.title} />
                          </div>
                        </Grid>
                        <Grid item xs={3}>
                          <div className="cart-desc">
                            <span>{cartItem.title}</span>
                            <span>Size {cartItem.sizeProduct}</span>
                          </div>
                        </Grid>
                        <Grid item xs={2}>
                          <div className="cart-size">
                            <FormControl
                              sx={{ m: 1, minWidth: 100 }}
                              size="small"
                              variant="outlined"
                            >
                              <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={
                                  defineSize(cartItem.sizeProduct)
                                    ? defineSize(cartItem.sizeProduct)
                                    : age
                                }
                                onChange={(event) => {
                                  handleChange(event, cartItem);
                                }}
                              >
                                {cartItem.size.map((itemSize, index) => (
                                  <MenuItem
                                    value={(index + 1) * 10}
                                    key={index}
                                  >
                                    {itemSize}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                        </Grid>
                        <Grid item xs={1}>
                          <div className="cart-quantity">
                            <IoChevronBackOutline
                              onClick={() => handleDecreaseCart(cartItem)}
                            />
                            <span className="count">
                              {cartItem.cartQuantity}
                            </span>
                            <IoChevronForwardOutline
                              onClick={() => {
                                handleIncreaseCart(cartItem);
                              }}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={1}>
                          <div className="cart-price">
                            <span>
                              {cartItem.cartQuantity * (cartItem.price * 1)}
                            </span>
                            <span className="symbol">&#8363;</span>
                          </div>
                        </Grid>
                        <Grid item xs={2}>
                          <div className="cart-status">{cartItem.status}</div>
                        </Grid>
                        <Grid item xs={1}>
                          <div className="clear-item">
                            <AiOutlineClose
                              onClick={() => handleRemoveFromCart(cartItem)}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    ))}
                  </Box>
                </div>
                <div className="total-product">
                  <span>
                    Tổng số sản phẩm:<span> </span>
                    <span>{totalProduct(cart.cartItems)}</span>
                  </span>
                </div>
                <div className="cart-actions">
                  <span
                    className="button-login-reg"
                    style={{
                      paddingTop: "20px",
                    }}
                  >
                    <button type="button" className="button-login-reg-detail">
                      <span>
                        <Link to="/product">TIẾP TỤC MUA SẮM</Link>
                      </span>
                    </button>
                  </span>
                  <span
                    className="button-login-reg"
                    style={{
                      paddingTop: "20px",
                    }}
                  >
                    <button type="button" className="button-login-reg-detail">
                      <span onClick={handleContinueCart}>TIẾP TỤC</span>
                    </button>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </AnimatedPage>
    </>
  );
};

export default Cart;
