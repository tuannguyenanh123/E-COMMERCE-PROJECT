import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SearchIcon from "@mui/icons-material/Search";

import "./Header.scss";

const Header = ({ cls }) => {
  const ariaLabel = { "aria-label": "description" };
  const [classShowHide, setClassShowHide] = useState("");
  useEffect(() => {
    setClassShowHide(cls);
  }, [cls]);
  console.log(classShowHide);
  return (
    <div className={`header ${classShowHide ? classShowHide : ""}`}>
      <div className="header-content">
        <a href="https://mrsimple.vn/" className="logo__link">
          <img
            src="./assets/logo.png"
            alt="anh-logo-header"
            className="logo__image"
          />
        </a>
        <ul className="list-actions">
          <li>
            <div className="form-search">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <Input placeholder="Tìm kiếm..." inputProps={ariaLabel} />
                <SearchIcon className="search-icon" />
              </Box>
            </div>
          </li>
          <li className="option-header common-icon-dropdown">
            <img
              src="https://mrsimple.vn/frontend/img/flag/vn.png"
              alt="tiengviet"
              className="language"
            ></img>
            <span className="text-language">TIẾNG VIỆT</span>
            <ArrowDropDownIcon />
          </li>
          <li className="option-header common-icon-dropdown">
            <span>TẢI ỨNG DỤNG</span>
            <ArrowDropDownIcon />
          </li>
          <li className="option-header">ĐĂNG NHẬP</li>
          <li className="option-header">LIÊN HỆ</li>
          <li className="option-header">
            <FavoriteIcon />
          </li>
          <li className="option-header">
            <ShoppingBagIcon />
          </li>
        </ul>
        <div></div>
      </div>
    </div>
  );
};

export default Header;
