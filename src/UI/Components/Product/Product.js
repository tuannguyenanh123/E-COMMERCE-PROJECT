import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ProductCard from "../ProductCard/ProductCard";
import "./Product.scss";
import { useDispatch, useSelector } from "react-redux";
import AnimatedPage from "../AnimatedPage/AnimatedPage";
import { keyWordSearchProduct } from "../../../Redux/Reducers/productSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Product = ({}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    return () => {
      dispatch(keyWordSearchProduct(""));
    };
  }, []);
  const products = useSelector((state) => state.productToDetail.products);
  const keyWord = useSelector((state) => state.productToDetail.keyWordSearch);
  return (
    <AnimatedPage>
      <Box sx={{ flexGrow: 1 }} className="section-products">
        <Grid container spacing={2} className="product-list">
          {keyWord
            ? products
                .filter((val) => {
                  if (
                    val.categorySlug
                      .toLowerCase()
                      .includes(keyWord.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((product, index) => (
                  <Grid item xs={6} key={index}>
                    <Item>
                      <ProductCard product={product} />
                    </Item>
                  </Grid>
                ))
            : products.map((product, index) => (
                <Grid item xs={6} key={index}>
                  <Item>
                    <ProductCard product={product} />
                  </Item>
                </Grid>
              ))}
        </Grid>
      </Box>
    </AnimatedPage>
  );
};

export default Product;
