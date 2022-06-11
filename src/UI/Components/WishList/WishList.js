import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./WithList.scss";

const WishList = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== true) {
      navigate("/login");
    }
  }, []);

  return <div className="section">WishList</div>;
};

export default WishList;
