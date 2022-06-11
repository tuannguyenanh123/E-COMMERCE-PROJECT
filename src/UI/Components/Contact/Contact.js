import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";

import "./Contact.scss";
import AnimatedPage from "../AnimatedPage/AnimatedPage";

const Login = () => {
  return (
    <AnimatedPage>
      <div className="content-main contact">
        <div className="contact">
          <div className="heading-title">DỊCH VỤ KHÁCH HÀNG</div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={16} md={8}>
                <div className="contact-content-1">
                  <div className="contact-title">
                    <p className="title">TRỰC TUYẾN</p>
                  </div>
                  <p className="title-sub">Tham khảo về mua hàng qua mạng</p>
                  <Accordion className="accor-main">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography fontWeight="bold" className="desc-icon">
                        <BsFillTelephoneFill />
                        Số điện thoại
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="detail-description">
                        +842871079997
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion className="accor-main">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography
                        fontWeight="bold"
                        className="desc-icon social"
                      >
                        <span>@ </span>LIÊN KẾT MẠNG XÃ HỘI
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="detail-description">
                        Facebook: mrsimplestyle
                        <br />
                        Instagram: @mrsimple_store
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Grid>
              <Grid item xs={16} md={8}>
                <div className="contact-content-2">
                  <div className="contact-title">
                    <p className="title">CỬA HÀNG VÀ CÔNG TY</p>
                  </div>
                  <p className="title-sub">
                    Bạn hãy tham khảo tại các cửa hàng của chúng tôi{" "}
                    <b>
                      <Link to="/listAgency">tại đây</Link>
                    </b>
                    .
                  </p>
                  <Accordion className="accor-main">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography fontWeight="bold" className="desc-icon">
                        <IoIosMail />
                        EMAIL
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="detail-description">
                        mrsimplestyle@gmail.com
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion className="accor-main">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography
                        fontWeight="bold"
                        className="desc-icon social"
                      >
                        <span>@ </span>LIÊN KẾT MẠNG XÃ HỘI
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="detail-description">
                        Facebook: mrsimplestyle
                        <br />
                        Instagram: @mrsimple_store
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Login;
