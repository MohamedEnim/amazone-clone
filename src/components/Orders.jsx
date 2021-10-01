import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import "./Orders.css";
import { useSelector } from "react-redux";
import { getUser } from "./../store/features/userSlice";
import Order from "./Order";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector(getUser);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.id)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
