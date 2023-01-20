import React, { useState } from "react";
import { useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const KEY =
  "pk_test_51MS4FDSGsnocqv0d2k2XzuxpzdLfivb3fhzn6Dp6kErjDWjMBEcUF4QCytQZDVRwkC4MZ4uZAl7ypMKk0OFqoRdr00zr1bchQk";

const Payment = () => {
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    console.log(token);
    setStripeToken(token);
  };

  useEffect(() => {
    const makeReq = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 499900,
          }
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeReq();
  }, [stripeToken]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "teal",
        minHeight: "100vh",
      }}
    >
      <StripeCheckout
        name="OPTIKART"
        image="https://i.pinimg.com/originals/c0/1b/95/c01b951ed9661ccd68cdc248e5a00c8e.png"
        billingAddress
        shippingAddress
        description="Your total is 4999 Rs."
        amount={499900}
        token={onToken}
        stripeKey={KEY}
      >
        <button
          style={{
            padding: "20px 30px",
            background: "black",
            color: "white",
            border: "none",
          }}
        >
          PAY NOW
        </button>
      </StripeCheckout>
    </div>
  );
};

export default Payment;
