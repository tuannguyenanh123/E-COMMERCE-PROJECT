import { isFulfilled } from "@reduxjs/toolkit";
import React, { useState } from "react";

const SideItemChild = ({ item }) => {
  const [isOpenSideBarChild, setOpenSideBarChild] = useState(false);
  const openSideBarChild = () => {
    if (isOpenSideBarChild) {
      setOpenSideBarChild(false);
    } else {
      setOpenSideBarChild(true);
    }
  };
  return (
    <div
      onClick={() => {
        openSideBarChild();
      }}
    >
      <span>
        {item.title}
        {item.childrens &&
          item.childrens.map((child, index) => (
            <>{isOpenSideBarChild && <div key={index}>{child.title}</div>}</>
          ))}
      </span>
    </div>
  );
};

export default SideItemChild;
