import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/features/userSlice";
import Payment from "./components/Payment";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Orders from "./components/Orders";

const stripePromise = loadStripe(
  "pk_test_51JazBGDCdRl38bAALAPqm4xgkeppHDqWJNApEyeuDmlkJQCINMbSvUpLb4r0uK0QnTuG53OcIIovMSZ7gAnX0L3v001BtLpVgn"
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            email: user.email,
            id: user.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  });

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/payment">
            <Elements stripe={stripePromise}>
              <Header />
              <Payment />
            </Elements>
          </Route>
          <Route path="/ckeckout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
