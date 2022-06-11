import React from "react";

import Banner from "../../Components/Banner/Banner";
import Category from "../../Components/Category/Category";
import Popup from "../../Components/Popup/Popup";
import SideBar from "../../Components/SideBar/SideBar";
import "./Content.scss";

const Content = () => {
  return (
    <div className="content">
      <Banner />
      <Category />
      <SideBar />
      <Popup />
    </div>
  );
};

export default Content;
