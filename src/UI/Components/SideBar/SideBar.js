import React, { useEffect, useRef, useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
} from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";

import "./SideBar.scss";
import { showSideBarOrOptions } from "../../../Redux/Reducers/appSlice";
import { Link, useNavigate } from "react-router-dom";
import { filter } from "../../../Redux/Reducers/productSlice";

const SideBar = ({ collapsed, rtl, toggled, handleToggleSidebar }) => {
  const isShowSidebar = useSelector(
    (state) => state.appReducer.isShow.showSideBar
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChooseListProduct = (text) => {
    navigate("/product");
    dispatch(filter(text));
    window.scrollTo({ top: 0, behavior: "Smooth" });
  };
  const handlePageProduct = () => {
    navigate("/product");
    window.location.reload();
  };

  return (
    <nav className={isShowSidebar ? "sideBar show" : "sideBar"}>
      <div className="category">
        <div className="category__list">
          <ProSidebar
            image={false}
            rtl={rtl}
            collapsed={collapsed}
            toggled={toggled}
            onToggle={handleToggleSidebar}
          >
            <SidebarContent>
              <Menu iconShape="circle">
                <MenuItem onClick={handlePageProduct}>HÀNG MỚI</MenuItem>
                <SubMenu title="TẤT CẢ SẢN PHẨM">
                  <MenuItem
                    onClick={() => {
                      handleChooseListProduct("quan-tay");
                    }}
                  >
                    ÁO KHOÁC BLAZER & QUẦN TÂY
                  </MenuItem>
                  <SubMenu
                    title="ÁO SƠ MI"
                    onOpenChange={() => {
                      handleChooseListProduct("ao-somi");
                    }}
                  >
                    <MenuItem>ÁO SƠ MI CÔNG SỞ</MenuItem>
                    <MenuItem>ÁO SƠ MI THƯỜNG NGÀY</MenuItem>
                    <MenuItem>ÁO SƠ MI NGẮN TAY</MenuItem>
                  </SubMenu>
                  <SubMenu title="QUẦN JEAN">
                    <MenuItem>REGULAR JEAN</MenuItem>
                    <MenuItem>SKINNY JEAN</MenuItem>
                  </SubMenu>
                  <SubMenu
                    title="ÁO KHOÁC"
                    onOpenChange={() => {
                      handleChooseListProduct("ao-khoac");
                    }}
                  >
                    <MenuItem>ÁO KHOÁC DÙ VÀ ÁO PHAO</MenuItem>
                    <MenuItem>ÁO KHOÁC DA - DENIM - DỆT KIM</MenuItem>
                  </SubMenu>
                  <MenuItem>QUẦN KAKI</MenuItem>
                  <SubMenu title="ÁO THUN CÓ CỔ">
                    <MenuItem>POLO DỆT KIM</MenuItem>
                    <MenuItem>POLO TRƠN</MenuItem>
                    <MenuItem>POLO PHỐI</MenuItem>
                  </SubMenu>
                  <SubMenu
                    title="ÁO THUN"
                    onOpenChange={() => {
                      handleChooseListProduct("ao-thun");
                    }}
                  >
                    <MenuItem>ÁO THUN IN/PHỐI</MenuItem>
                    <MenuItem>ÁO TRƠN</MenuItem>
                    <MenuItem>ÁO TAY DÀI</MenuItem>
                  </SubMenu>
                  <MenuItem>ÁO DỆT KIM</MenuItem>
                  <MenuItem>QUẦN NGẮN</MenuItem>
                  <MenuItem>PHỤ KIỆN</MenuItem>
                  <MenuItem>QUẦN LÓT</MenuItem>
                </SubMenu>
                <MenuItem>TRANG PHỤC CÔNG SỞ</MenuItem>
                <SubMenu title="PHỐI SẴN VÀ MẶC">
                  <MenuItem>PHỐI SẴN & MẶC VOL 3</MenuItem>
                  <MenuItem>PHỐI SẴN & MẶC VOL 2</MenuItem>
                  <MenuItem>PHỐI SẴN & MẶC VOL 1</MenuItem>
                </SubMenu>
                <MenuItem>THE POLO S'22</MenuItem>
                <MenuItem>MRSIMPLE HOME</MenuItem>
                <MenuItem>MRSIMPLE CRESCENT MALL QUẬN 7</MenuItem>
                <MenuItem>CỬA HÀNG | ĐÀ NẴNG</MenuItem>
              </Menu>
            </SidebarContent>
          </ProSidebar>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
