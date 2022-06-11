import React from "react";
import { useDispatch } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

import DetailProduct from "../DetailProduct/DetailProduct";
import { transProductToDetail } from "./../../../Redux/Reducers/productSlice";
import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const handleTransProduct = () => {
    dispatch(transProductToDetail(product));
  };
  return (
    <div className="product">
      <div className="thumb">
        <span className="cardIcon">
          <AiOutlineHeart />
        </span>
        <Link
          to={`/product/${product.title}`}
          element={<DetailProduct productTitle={product.title} />}
        >
          <img
            src={product.image}
            alt={product.title}
            onClick={handleTransProduct}
          />
        </Link>
      </div>
      <div className="product-info">
        <div href="#Link" className="name">
          {product.title}
        </div>
        <div className="price">
          {product.price}
          <span className="price-symbol">&#8363;</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
