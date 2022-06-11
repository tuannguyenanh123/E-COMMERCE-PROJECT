import React from "react";
import { useSelector } from "react-redux";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";

import "./DoneOrder.scss";

const DoneOrder = () => {
  const cart = useSelector((state) => state.cart).cartItems;
  const getDetailOrderUserAfterDiscount = useSelector(
    (state) => state.user
  ).detailOrderUserAfterDiscount;
  const getTotalPrice = () => {
    if (getDetailOrderUserAfterDiscount !== null) {
      return getDetailOrderUserAfterDiscount.priceDiscount;
    } else {
      let totalPrice = 0;
      for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].cartQuantity * (cart[i].price * 1);
      }
      return totalPrice;
    }
  };

  return (
    <div className="doneOrder__section">
      <h1>Order Complete</h1>
      <h4>Thank you for placing your order!</h4>
      <div className="totalPrice">
        <span>Tổng tiền đơn hàng của bạn là </span> {getTotalPrice()} đồng
        <br />
        {getDetailOrderUserAfterDiscount.isCoupon ? (
          <small>(Đã bao gồm mã giảm giá)</small>
        ) : null}
      </div>
      <div className="start-shopping">
        <Link to="/product">
          <MdKeyboardBackspace />
          <span>Return product</span>
        </Link>
      </div>
    </div>
  );
};

export default DoneOrder;
