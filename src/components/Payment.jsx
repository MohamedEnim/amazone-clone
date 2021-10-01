import "./Payment.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  emptyBasket,
  getNumberOfProductInBasket,
  getPriceOfProductsInBasket,
  getProductsInTheBasket,
} from "./../store/features/productSlice";
import { Link } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import { CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../axios";
import { useHistory } from "react-router";
import { getUser } from "./../store/features/userSlice";
import { db } from "../firebase";

function Payment(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const getItemsInTheBasket = useSelector(getNumberOfProductInBasket);
  const getPriceInTheBasket = useSelector(getPriceOfProductsInBasket);
  const getProducts = useSelector(getProductsInTheBasket);
  const user = useSelector(getUser);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getPriceInTheBasket * 100}`,
      });

      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [getProducts]);

  const onHandelPayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        })
        .then(({ paymentIntent }) => {
          db.collection("users")
            .doc(user?.id)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
              basket: getProducts,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            });
          setSucceeded(true);
          setError(false);
          setProcessing(false);
          dispatch(emptyBasket());
          history.replace("/orders");
        });
    }
  };

  const handelChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <h1>
        Checkout <Link to="ckeckout">({getItemsInTheBasket} items)</Link>
      </h1>
      <div className="payment__container">
        <div className="payment__adress">
          <div className="payment__adressLeft">
            <h3>Delivery Adress</h3>
          </div>
          <div className="payment__adressRight">
            <p className="payment__adressAdress">user Email</p>
            <p className="payment__adressAdress">Nefta, Tunis</p>
            <p className="payment__adressAdress">Rue arbi chrone</p>
          </div>
        </div>
        <div className="payment__product">
          <div className="payment__productLeft">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__productRight">
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
        </div>
        <div className="payment__payment">
          <div className="payment__paymentLeft">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__paymentRight">
            <form onSubmit={onHandelPayment}>
              <p>Card Details</p>
              <CardElement
                onChange={handelChange}
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
              <div className="payment__paymentOrder">
                <CurrencyFormat
                  renderText={(value) => <h4>OrderTotal: {value}</h4>}
                  value={getPriceInTheBasket}
                  decimalScale={2}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  type="submit"
                  disabled={succeeded || processing || disabled}
                >
                  <span>{processing ? "Processing" : "Buy now"}</span>
                </button>
              </div>
              {error && <p>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
