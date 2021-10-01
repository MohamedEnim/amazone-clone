import "./CheckoutProduct.css";
import Rating from "@material-ui/lab/Rating";
import React from "react";
import Box from "@material-ui/core/Box";
import { useDispatch } from "react-redux";
import { removeProduct } from "../store/features/productSlice";

function CheckoutProduct({ id, title, price, rating, imageURL, hideButton }) {
  const dispatch = useDispatch();

  const removeFrombasket = () => {
    dispatch(removeProduct({ id, title, price, rating, imageURL }));
  };

  return (
    <div className="checkoutProduct">
      <div className="checkoutProduct__image">
        <img src={imageURL} alt="" />
      </div>
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <Box component="fieldset" borderColor="transparent">
          <Rating name="read-only" value={rating} readOnly />
        </Box>
        {!hideButton && (
          <button onClick={removeFrombasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
