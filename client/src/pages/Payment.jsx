import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import "./Cart/Cart.scss";

const Payment = ({ cart }) => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const handleCheckout = () => {
    axios
      .post("/stripe/create-checkout-session", {
        cart,
        userId: user._id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <button onClick={() => handleCheckout()} className="checkout-btn">
        CHECKOUT NOW
      </button>
    </>
  );
};

export default Payment;
