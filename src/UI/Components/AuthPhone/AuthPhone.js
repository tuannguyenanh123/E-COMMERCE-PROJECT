import React, { useState } from "react";
import "./AuthPhone.scss";

const AuthPhone = () => {
  return (
    <div className="authPhone">
      <h1>XÁC MINH SỐ ĐIỆN THOẠI</h1>
      <div className="page">
        <label htmlFor="otpInput" className="form-label">
          OTP
        </label>
        <input type="number" className="form-control" id="otpInput" />
        <div id="otpHelp" className="form-text">
          Please enter your OTP code
        </div>
      </div>
    </div>
  );
};

export default AuthPhone;
