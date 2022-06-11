import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import "./Filter.scss";
import { useDispatch } from "react-redux";
import {
  filter,
  filterProductByPrice,
} from "../../../Redux/Reducers/productSlice";

function valuetext(value) {
  return `${value}°C`;
}
const theme = createTheme({
  palette: {
    neutral: {
      main: "#909090",
      contrastText: "#fff",
    },
  },
});

const Filter = ({ isShowFilterDetail, handleToggleFilter }) => {
  const [value, setValue] = useState([0, 1899000]);
  const dispatch = useDispatch();
  // const ref = useRef(null);
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.key === "Escape" && handleToggleFilter();
    });
    return () => {
      document.removeEventListener("keydown", (e) => e);
    };
  }, [isShowFilterDetail]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(filterProductByPrice(newValue));
  };

  // const handleChooseSize = () => {
  //   // setActiveSize(!isActiveSize);
  //   ref.current.className === "active"
  //     ? (ref.current.className = "")
  //     : (ref.current.className = "active");
  //   console.log(ref);
  // };
  // select size
  const [size, setSize] = useState(() => [""]);
  const handleDevices = (event, newSizes) => {
    if (newSizes.length) {
      setSize(newSizes);
      console.log(newSizes);
    }
  };

  return (
    <div
      className={
        isShowFilterDetail ? "filter-section active" : "filter-section"
      }
    >
      <div className="filter-content">
        <div className="filter-size">
          <h1>Kích cỡ</h1>
          <div className="filter-size__content">
            <Stack direction="row" spacing={4}>
              <ToggleButtonGroup value={size} onChange={handleDevices}>
                <ToggleButton value="XS">XS</ToggleButton>
                <ToggleButton value="S">S</ToggleButton>
                <ToggleButton value="M">M</ToggleButton>
                <ToggleButton value="XL">XL</ToggleButton>
                <ToggleButton value="XXL">XXL</ToggleButton>
                <ToggleButton value="XXXL">XXXL</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </div>
        </div>
        <div className="filter-price">
          <h1>Giá</h1>
          <div className="limit-price">
            <span>
              {value[0].toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
              <span> -</span>
            </span>
            <span>
              {" "}
              {value[1].toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <div className="filter-price__content">
            <ThemeProvider theme={theme}>
              <Box sx={{ width: 300, marginTop: 40 }} className="slider-filter">
                <Slider
                  getAriaLabel={() => "Temperature range"}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  min={20000}
                  max={1899000}
                  color="neutral"
                />
              </Box>
            </ThemeProvider>
          </div>
        </div>
      </div>
      <div className="icon-close">
        <IoCloseSharp onClick={handleToggleFilter} />
      </div>
    </div>
  );
};

export default Filter;
