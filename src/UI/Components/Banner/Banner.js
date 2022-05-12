import React from "react";
import "./Banner.scss";

const Banner = () => {
  return (
    <div className="banner">
      <video autoPlay loop muted width="100%" height="100%">
        <source
          src="https://mrsimple.s3.cloud.cmctelecom.vn/images/slider/videos/16494809283Models.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default Banner;
