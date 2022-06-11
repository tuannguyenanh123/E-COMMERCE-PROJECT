import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { categoryLevelPage } from "./index";
import "./Category.scss";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Category = () => {
  return (
    <div className="category__page">
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={6}
          className="category__page__list"
          id="IdOfContent"
        >
          {categoryLevelPage.map((item, index) => (
            <Grid item xs={12} md={6} className="category__item" key={index}>
              <Item>
                <img src={item.image} alt={item.title} />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Category;
