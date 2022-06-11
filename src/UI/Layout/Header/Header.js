import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import { Menu, Dropdown, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiDotsVertical } from "react-icons/bi";

import { TEXT_LANGUGE_EN, TEXT_LANGUGE_VN } from "./index";
import "./Header.scss";
import Filter from "../../Components/Filter/Filter";
import { totalProduct } from "./../../../Utilities/index";
import DropDown from "../../Components/DropDown/DropDown";
import { showSideBarOrOptions } from "../../../Redux/Reducers/appSlice";
import {
  filter,
  keyWordSearchProduct,
} from "../../../Redux/Reducers/productSlice";

const Header = ({ cls }) => {
  const [isShowFilter, setShowFilter] = useState(false);
  const [isShowFilterDetail, setShowFilterDetail] = useState(false);
  const [selectedInLoginLogout, setSelectedInLoginLogout] = useState("Loged");
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.appReducer.isShow);
  const handleShow = (text) => {
    if (text === "sidebar")
      dispatch(
        showSideBarOrOptions({
          showSideBar: !isShow.showSideBar,
          showOptions: isShow.showOptions
            ? !isShow.showOptions
            : isShow.showOptions,
        })
      );
    else if (text === "options") {
      dispatch(
        showSideBarOrOptions({
          showSideBar: isShow.showSideBar
            ? !isShow.showSideBar
            : isShow.showSideBar,
          showOptions: !isShow.showOptions,
        })
      );
    } else {
      return;
    }
  };
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (window.location.href === "http://localhost:3000/product") {
      setShowFilter(true);
    } else {
      setShowFilter(false);
    }
  }, [window.location.href]);
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.key === "Escape" &&
        dispatch(
          showSideBarOrOptions({
            showSideBar: false,
            showOptions: false,
          })
        );
    });
    return () => {
      document.removeEventListener("keydown", (e) => e);
    };
  }, []);
  const handleToggleFilter = () => {
    setShowFilterDetail(!isShowFilterDetail);
  };
  const menu = (
    <Menu
      className="ghide"
      items={[
        {
          label: (
            <span
              className="option-language-VN"
              onClick={() => {
                handleChangeLanguage();
              }}
            >
              <img
                src="https://mrsimple.vn/frontend/img/flag/gb.png"
                alt="tienganh"
                className="language"
              ></img>
              <span className="text-language">{TEXT_LANGUGE_EN}</span>
            </span>
          ),
          key: "0",
        },
        {
          label: (
            <span
              className="option-language-EN"
              onClick={() => {
                handleChangeLanguage();
              }}
            >
              <img
                src="https://mrsimple.vn/frontend/img/flag/vn.png"
                alt="tiengviet"
                className="language"
              ></img>
              <span className="text-language">{TEXT_LANGUGE_VN}</span>
            </span>
          ),
          key: "1",
        },
      ]}
    />
  );
  const menuOS = (
    <Menu
      className="ghide app"
      items={[
        {
          label: (
            <a
              className="dropdown-item"
              href="https://itunes.apple.com/us/app/mrsimple/id1438864461?mt=8&amp;ign-mpt=uo%3D4"
            >
              <img
                src="https://mrsimple.vn/frontend/img/logo/appstore.png"
                alt="appstore"
                className="language"
              />
              <span className="text-language app">APP STORE</span>
            </a>
          ),
          key: "0",
        },
        {
          label: (
            <a
              className="dropdown-item"
              href="https://play.google.com/store/apps/details?id=vn.mrsimple"
            >
              <img
                src="https://mrsimple.vn/frontend/img/logo/playstore.png"
                alt="googleplay"
                className="language"
              />
              <span className="text-language">GOOGLE PLAY</span>
            </a>
          ),
          key: "1",
        },
      ]}
    />
  );
  const ariaLabel = { "aria-label": "description" };
  const [classShowHide, setClassShowHide] = useState("");
  const [changeLanguage, setChangeLanguage] = useState({
    title: TEXT_LANGUGE_VN,
    img: "https://mrsimple.vn/frontend/img/flag/vn.png",
  });
  useEffect(() => {
    setClassShowHide(cls);
  }, [cls]);
  const handleChangeLanguage = () => {
    if (changeLanguage.title === TEXT_LANGUGE_VN) {
      setChangeLanguage({
        title: TEXT_LANGUGE_EN,
        img: "https://mrsimple.vn/frontend/img/flag/gb.png",
      });
    } else {
      setChangeLanguage({
        title: TEXT_LANGUGE_VN,
        img: "https://mrsimple.vn/frontend/img/flag/vn.png",
      });
    }
  };
  const handleEventDefault = (e) => {
    e.preventDefault();
  };

  // feature search product
  const navigate = useNavigate();
  const keyWord = useSelector((state) => state.productToDetail.keyWordSearch);
  return (
    <div className={`header ${classShowHide ? classShowHide : ""}`}>
      <div className="header-content">
        {!isShow.showSideBar ? (
          <div className="toggle-left">
            <GiHamburgerMenu
              onClick={() => {
                handleShow("sidebar");
              }}
            />
          </div>
        ) : null}
        <Link to="/" className="logo__link">
          <img
            src="./../../../assets/logo.png"
            alt="anh-logo-header"
            className="logo__image"
          />
        </Link>
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
                <Input
                  placeholder="Tìm kiếm..."
                  inputProps={ariaLabel}
                  onChange={(e) =>
                    dispatch(keyWordSearchProduct(e.target.value))
                  }
                />
                <SearchIcon
                  className="search-icon"
                  onClick={() => {
                    console.log(keyWord);
                    navigate("/product");
                    dispatch(filter(keyWord));
                  }}
                />
              </Box>
            </div>
          </li>
          <li className="option-language common-icon-dropdown">
            <img
              src={changeLanguage.img}
              alt={changeLanguage.title}
              className="language"
            ></img>
            <Dropdown overlay={menu} trigger={["click"]}>
              <span
                onClick={(e) => {
                  handleEventDefault(e);
                }}
              >
                <Space>
                  {changeLanguage.title}
                  <ArrowDropDownIcon />
                </Space>
              </span>
            </Dropdown>
          </li>
          <li className="option-header common-icon-dropdown">
            <div className="option-header-app">
              <Dropdown overlay={menuOS} trigger={["click"]}>
                <span
                  onClick={(e) => {
                    handleEventDefault(e);
                  }}
                >
                  <Space>
                    <span>TẢI ỨNG DỤNG</span>
                    <ArrowDropDownIcon />
                  </Space>
                </span>
              </Dropdown>
            </div>
          </li>
          <li className="option-header">
            <DropDown
              items={["TÀI KHOẢN CỦA TÔI", "ĐĂNG XUẤT"]}
              selectedInLoginLogout={selectedInLoginLogout}
              setSelectedInLoginLogout={setSelectedInLoginLogout}
              user={user}
            />
          </li>
          <li className="option-header">
            <Link to="/contact">LIÊN HỆ</Link>
          </li>
          <li className="option-header wishlist">
            <Link to="/wishlist">
              <FavoriteIcon />
            </Link>
          </li>
          <li className="option-header bag">
            <Link to="/cart">
              <ShoppingBagIcon />
              <span className="bag-quantity">
                <span>{totalProduct(cart.cartItems)}</span>
              </span>
            </Link>
          </li>
        </ul>
        <div className="options">
          <span className="wishlist--responsive">
            <Link to="/wishlist">
              <FavoriteIcon />
            </Link>
          </span>
          <span className="bag--responsive">
            <Link to="/cart">
              <ShoppingBagIcon />
              {totalProduct(cart.cartItems) > 0 ? (
                <span className="bag-quantity">
                  <span>{totalProduct(cart.cartItems)}</span>
                </span>
              ) : null}
            </Link>
          </span>
          <div className="toggle-right">
            <BiDotsVertical
              onClick={() => {
                handleShow("options");
              }}
            />
          </div>
        </div>
        <ul className={isShow.showOptions ? "options active" : "options"}>
          <li className="option-language common-icon-dropdown">
            <img
              src={changeLanguage.img}
              alt={changeLanguage.title}
              className="language"
            ></img>
            <Dropdown overlay={menu} trigger={["click"]}>
              <span
                onClick={(e) => {
                  handleEventDefault(e);
                }}
              >
                <Space>
                  {changeLanguage.title}
                  <ArrowDropDownIcon />
                </Space>
              </span>
            </Dropdown>
          </li>
          <li className="option-header common-icon-dropdown">
            <div className="option-header-app">
              <Dropdown overlay={menuOS} trigger={["click"]}>
                <span
                  onClick={(e) => {
                    handleEventDefault(e);
                  }}
                >
                  <Space>
                    <span>TẢI ỨNG DỤNG</span>
                    <ArrowDropDownIcon />
                  </Space>
                </span>
              </Dropdown>
            </div>
          </li>
          <li className="option-header">
            <DropDown
              items={["TÀI KHOẢN CỦA TÔI", "ĐĂNG XUẤT"]}
              selectedInLoginLogout={selectedInLoginLogout}
              setSelectedInLoginLogout={setSelectedInLoginLogout}
              user={user}
            />
          </li>
          <li className="option-header">
            <Link to="/contact">LIÊN HỆ</Link>
          </li>
        </ul>
      </div>
      {isShowFilter ? (
        <>
          <div className="category-actions">
            <div className="action-wrapper">
              <div className="drawer-toggle" onClick={handleToggleFilter}>
                Bộ lọc
              </div>
              <div className="grid-col-show">
                <label>Hiển thị:</label>
                <div className="grid-col">
                  <span className="icon-grid-2"></span>
                  <span className="icon-grid-4"></span>
                </div>
              </div>
            </div>
          </div>
          <Filter
            isShowFilterDetail={isShowFilterDetail}
            handleToggleFilter={handleToggleFilter}
          />
        </>
      ) : null}
    </div>
  );
};

export default Header;
