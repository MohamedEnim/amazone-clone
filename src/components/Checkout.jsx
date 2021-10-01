import "./Checkout.css";

import React from "react";
import CurrencyFormat from "react-currency-format";
import { useSelector } from "react-redux";
import {
  getNumberOfProductInBasket,
  getPriceOfProductsInBasket,
  getProductsInTheBasket,
} from "./../store/features/productSlice";
import CheckoutProduct from "./CheckoutProduct";
import { useHistory } from "react-router";

function Checkout(props) {
  const history = useHistory();

  const getItemsInTheBasket = useSelector(getNumberOfProductInBasket);
  const getPriceInTheBasket = useSelector(getPriceOfProductsInBasket);
  const getProducts = useSelector(getProductsInTheBasket);

  const onHandelPayment = () => {
    history.push("payment");
  };

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <h2 className="checkout__title">Your shopping Basket</h2>

        {/* Checkout Product */}
        {getProducts.map((product, index) => (
          <CheckoutProduct
            key={index}
            id={product.id}
            title={product.title}
            price={product.price}
            rating={product.rating}
            imageURL={product.imageURL}
          />
        ))}
      </div>
      <div className="checkout__right">
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p>
                Subtotal ({getItemsInTheBasket} items): <strong>{value}</strong>
              </p>
              <small className="checkout__gift">
                <input type="checkbox" name="" id="" />
                This order contains a gift
              </small>
            </>
          )}
          value={getPriceInTheBasket}
          decimalScale={2}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
        <button onClick={onHandelPayment}>Proceed to checkout</button>
      </div>
    </div>
  );
}

export default Checkout;
