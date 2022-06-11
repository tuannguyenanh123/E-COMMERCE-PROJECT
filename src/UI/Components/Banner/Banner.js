import React from "react";
import "./Banner.scss";

const Banner = () => {
  return (
    <div className="banner">
      <video autoPlay loop muted width="100%" height="100%">
        <source
          src="https://mrsimple.s3.cloud.cmctelecom.vn/images/slider/videos/1653016198linenmencollection web_1.mp4"
          type="video/mp4"
        />
      </video>
      <a className="scrollToId" href="#IdOfContent">
        <div className="icon-scroll"></div>
      </a>
    </div>
  );
};

export default Banner;
