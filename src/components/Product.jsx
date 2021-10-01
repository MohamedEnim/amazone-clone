import "./Product.css";
import Rating from "@material-ui/lab/Rating";
import React from "react";
import Box from "@material-ui/core/Box";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/features/productSlice";

function Product({ id, title, price, rating, imageURL }) {
  const dispatch = useDispatch();

  const addTobasket = () => {
    dispatch(addProduct({ id, title, price, rating, imageURL }));
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <Box component="fieldset" mb={2} borderColor="transparent">
          <Rating name="read-only" value={rating} readOnly />
        </Box>
      </div>
      <div className="product__image">
        <img src={imageURL} alt="" />
      </div>
      <div className="product__button">
        <button onClick={addTobasket}>Add to Basket</button>
      </div>
    </div>
  );
}

export default Product;
