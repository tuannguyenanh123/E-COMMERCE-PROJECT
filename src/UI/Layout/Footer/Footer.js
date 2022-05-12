import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./Footer.scss";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <Grid container>
          <Grid item xs={6} md={3}>
            <div className="title">
              <b>HƯỚNG DẪN CÁCH MUA HÀNG</b>
            </div>
            <ul>
              <li>Cách mua hàng</li>
              <li>Thông tin chung</li>
              <li>Thanh toán</li>
              <li>Giao hàng</li>
              <li>Đổi và trả lại hàng hóa</li>
              <li>Các mặt hàng được thu hồi</li>
            </ul>
          </Grid>
          <Grid item xs={6} md={3}>
            <div className="title">
              <b>THEO DÕI CHÚNG TÔI</b>
            </div>
            <ul>
              <li>Bản tin</li>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>YouTube</li>
              <li>TikTok</li>
            </ul>
          </Grid>
          <Grid item xs={6} md={3}>
            <div className="title">
              <b>CHÍNH SÁCH</b>
            </div>
            <ul>
              <li>Chính sách bảo mật</li>
              <li>Chính sách vận chuyển</li>
            </ul>
          </Grid>
          <Grid item xs={6} md={3}>
            <div className="title">
              <b>CÔNG TY</b>
            </div>
            <ul>
              <li>Giới thiệu về chúng tôi</li>
              <li>Cửa hàng</li>
              <li>Liên hệ</li>
            </ul>
          </Grid>
        </Grid>
      </div>
      <div className="footer-copyright">
        <Grid container>
          <Grid item xs={6} md={2}>
            <div className="info">
              <p>MRSIMPLE CO., LTD</p>
              <p>
                399 Quang Trung, Phường 10, Quận Gò Vấp, Thành phố Hồ Chí Minh,
                Việt Nam
              </p>
              <p>Tel: 028.71079997, MST: 0314533055</p>
            </div>
          </Grid>
          <Grid item xs={6} md={3}>
            <a href="https://mrsimple.vn/">
              <img
                height="30"
                src="https://mrsimple.vn/img/LogoBranch/mrsimple.png"
                alt="anh logo"
              ></img>
            </a>
          </Grid>
          <Grid item xs={4} md={3}>
            <a href="http://thelittledoor.vn">
              <img
                height="50"
                src="https://mrsimple.vn/img/LogoBranch/TheLittleDoor.png"
                alt=""
              ></img>
            </a>
          </Grid>
          <Grid item xs={4} md={2}>
            <a href="https://thepolo.mrsimple.vn">
              <img
                alt=""
                height="50"
                src="https://mrsimple.vn/img/LogoBranch/thepolo.png"
              />
            </a>
          </Grid>
          <Grid item xs={4} md={2}>
            <div className="copyright">
              <img
                src="https://mrsimple.vn/frontend/img/logo/logo-congthuong.png"
                height="45"
                alt="Logo đã thông báo bộ Công Thương"
              />
              <p>© 2018 MRSIMPLE. All rights reserved.</p>
            </div>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
