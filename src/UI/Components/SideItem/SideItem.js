import React from "react";
import { useState } from "react";
import SideItemChild from "../SideItemChild/SideItemChild";

const SideItem = ({ items }) => {
  const [isOpen, setOpen] = useState(false);
  const openSideBar = () => {
    if (isOpen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  return (
    <div
      onClick={() => {
        openSideBar();
      }}
    >
      <span>
        {items.title}
        {items.childrens &&
          items.childrens.map((item, index) => (
            <>{isOpen && <SideItemChild item={item} key={index} />}</>
          ))}
      </span>
    </div>
  );
};

export default SideItem;
