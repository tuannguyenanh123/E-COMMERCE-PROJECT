import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./DropDown.scss";
import { logout } from "../../../Redux/Reducers/userSlice";

const DropDown = ({
  items,
  selectedInLoginLogout,
  setSelectedInLoginLogout,
  user,
}) => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const handleUser = (e, item) => {
    setSelectedInLoginLogout(e.target.textContent);
    if (item === "Tài khoản của tôi") {
      navigate("/account/my-account");
    } else {
      dispatch(logout());
      navigate("/");
    }
    setIsActive(false);
  };
  return (
    <>
      {user ? (
        <>
          <span
            className="login-logout"
            onClick={() => {
              setIsActive(!isActive);
            }}
          >
            {userName.userName
              ? userName.userName.toUpperCase()
              : "tự nhiên xóa"}
          </span>
          <div className="dropdown">
            {isActive ? (
              <div className="dropdown-content">
                {items.map((item, index) => (
                  <div
                    className="dropdown-item"
                    key={index}
                    onClick={(e) => {
                      handleUser(e, item);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <Link to={"/login"}>ĐĂNG NHẬP</Link>
      )}
    </>
  );
};

export default DropDown;
