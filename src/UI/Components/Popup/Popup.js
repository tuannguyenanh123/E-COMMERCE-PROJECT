import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import "./Popup.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Popup = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className="popup" onClick={handleOpen}>
        {/* <a href=""> */}
        <img src="https://mrsimple.vn/img/button.png" alt="cuahangao" />
        {/* </a> */}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="box-modal">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
            fontWeight="bold"
          >
            <a href="https://vr360.com.vn/projects/mrsimple-danang/">
              {" "}
              MRSIMPLE ĐÀ NẴNG
            </a>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Popup;
