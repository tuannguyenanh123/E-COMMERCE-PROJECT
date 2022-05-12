import React from "react";
import { Input, Space } from "antd";

import "./NewsLetter.scss";

const NewsLetter = () => {
  const onSearch = (value) => console.log(value);
  const { Search } = Input;
  return (
    <div className="newsLetter">
      <div className="heading-title">ĐĂNG KÍ NHẬN BẢN TIN</div>
      <Space direction="vertical">
        <Search
          className="form-register__send-letter"
          placeholder="Nhập địa chỉ email của bạn"
          allowClear
          enterButton="ĐĂNG KÝ"
          size="large"
          onSearch={onSearch}
          spellCheck="false"
        />
      </Space>
    </div>
  );
};

export default NewsLetter;
