import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { AiOutlineHeart } from "react-icons/ai";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReactImageMagnify from "react-image-magnify";

import "./DetailProduct.scss";
import { product_data } from "./../Product/Product_data";
import { addToCart } from "./../../../Redux/Reducers/cartSlice";
import AnimatedPage from "../AnimatedPage/AnimatedPage";
import { useRef } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DetailProduct = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const urlQueryItem = location.pathname.split("/").pop();
  const queryItemDetail = product_data?.find((element) => {
    return element.title === urlQueryItem;
  });
  const productDetail = queryItemDetail;
  const [options, setOptions] = useState({
    sizeProduct: productDetail.size[0],
    quantityProduct: 1,
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const handleAddToCart = (productDetail) => {
    dispatch(addToCart(productDetail));
    console.log(productDetail);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const increaseProduct = () => {
    if (options.quantityProduct > 0)
      setOptions({
        ...options,
        quantityProduct: options.quantityProduct + 1,
      });
  };
  const decreaseProduct = () => {
    if (options.quantityProduct > 1) {
      setOptions({
        ...options,
        quantityProduct: options.quantityProduct - 1,
      });
    }
  };

  // highlight when chose size
  const ref = useRef([]);
  ref.current = [];
  const addRefs = (el) => {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
    }
  };
  const handleChooseSize = (e, index) => {
    console.log(ref.current[index]);
    for (let j = 0; j < productDetail.size.length; j++) {
      if (index === j) {
        ref.current[j].style.backgroundColor = "gray";
      }
    }
    console.log(e.target.textContent);
    setOptions({
      ...options,
      sizeProduct: e.target.textContent,
    });
  };

  return (
    <div className="detail-product">
      <AnimatedPage>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="list-image-default">
                <div className="section-product-image">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={7} className="product-main">
                          <ReactImageMagnify
                            className="review--product"
                            {...{
                              smallImage: {
                                alt: "macchinh1",
                                isFluidWidth: true,
                                src: productDetail.imageDetail
                                  .imageDetailMain[0],
                              },
                              largeImage: {
                                src: productDetail.imageDetail
                                  .imageDetailMain[0],
                                width: 1200,
                                height: 1800,
                                className: "macchinh1",
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={5} className="product-main left">
                          <ReactImageMagnify
                            className="review--product"
                            {...{
                              smallImage: {
                                alt: "macchinh2",
                                isFluidWidth: true,
                                src: productDetail.imageDetail
                                  .imageDetailMain[1],
                                className: "macchinh2",
                              },
                              largeImage: {
                                src: productDetail.imageDetail
                                  .imageDetailMain[1],
                                width: 1200,
                                height: 1800,
                                className: "macchinh2",
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <ReactImageMagnify
                            className="review--product"
                            {...{
                              smallImage: {
                                alt: "macphu1",
                                isFluidWidth: true,
                                src: productDetail.imageDetail
                                  .imageDetailSub[0],
                              },
                              largeImage: {
                                src: productDetail.imageDetail
                                  .imageDetailSub[0],
                                width: 1200,
                                height: 1800,
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <ReactImageMagnify
                            className="review--product"
                            {...{
                              smallImage: {
                                alt: "macphu2",
                                isFluidWidth: true,
                                src: productDetail.imageDetail
                                  .imageDetailSub[1],
                              },
                              largeImage: {
                                src: productDetail.imageDetail
                                  .imageDetailSub[1],
                                width: 1200,
                                height: 1800,
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <ReactImageMagnify
                            className="review--product"
                            {...{
                              smallImage: {
                                alt: "macphu3",
                                isFluidWidth: true,
                                src: productDetail.imageDetail
                                  .imageDetailSub[2],
                              },
                              largeImage: {
                                src: productDetail.imageDetail
                                  .imageDetailSub[2],
                                width: 1200,
                                height: 1800,
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
                <div className="section-detail-actions">
                  <img
                    src="./../../../Images/ShowModalDetailProduct/icon-info.png"
                    alt="icon-show-modal"
                    onClick={handleOpen}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </AnimatedPage>
      <div className="section-product-info">
        <div className="section-name-wishlist">
          <h1 className="product-name">{productDetail.title}</h1>
          <span className="add-list-product">
            <AiOutlineHeart />
          </span>
        </div>
        <p className="product-code">{productDetail.codeProduct}</p>
        <p>
          {productDetail.descriptionTitle
            ? productDetail.descriptionTitle
            : null}
        </p>
        <ul>
          {productDetail.descriptionProduct?.map((item, index) => (
            <li key={index}>
              <b>{item.title ? item.title : item}</b>
              {item.descr
                ? item.descr.map((item, index) => (
                    <span key={index}>
                      {item}
                      <br />
                    </span>
                  ))
                : null}
            </li>
          ))}
        </ul>
        <div className="wrapper-set-measurements">
          {productDetail.measurementsImg ? (
            <img src={productDetail.measurementsImg} alt="kichthuocsize" />
          ) : null}
        </div>
        <div className="price">
          {productDetail.price}
          <span className="price-symbol">&#8363;</span>
        </div>
        <div className="size product-attr">
          <span className="size-title">Size:</span>
          <div className="size-list list">
            {productDetail.size?.map((item, index) => (
              <span
                key={index}
                ref={addRefs}
                onClick={(e) => handleChooseSize(e, index)}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="quantity">
          <span className="quantity-title">Số lượng: </span>
          <div className="quantity-content">
            <span>
              <MdOutlineArrowBackIos
                onClick={() => {
                  decreaseProduct();
                }}
              />
            </span>
            <span className="_quantity">{options.quantityProduct}</span>
            <span>
              <MdOutlineArrowForwardIos
                onClick={() => {
                  increaseProduct();
                }}
              />
            </span>
          </div>
        </div>
        <div className="suggest">
          <label
            style={{
              fontSize: "11px",
            }}
          >
            Đăng ký thành viên để nhận nhiều ưu đãi và khuyến mãi từ Mr.simple,{" "}
            <Link to="/register">tại đây</Link>
          </label>
        </div>
        <div className="button">
          <span className="button-login-reg">
            <button
              type="button"
              className="button-login-reg-detail"
              onClick={() => handleAddToCart({ ...productDetail, ...options })}
            >
              <span>THÊM VÀO GIỎ HÀNG</span>
            </button>
          </span>
          <span className="button-login-reg">
            <button type="button" className="button-login-reg-detail  btn-size">
              <span>TÌM SIZE THEO CHI NHÁNH</span>
            </button>
          </span>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="box-modal">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
            fontWeight="bold"
          >
            <span>
              {productDetail.popupCareProductImg ? (
                <img src={productDetail.popupCareProductImg} />
              ) : null}
            </span>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailProduct;
