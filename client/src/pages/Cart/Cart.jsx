import { Add, Remove } from "@mui/icons-material";
import React, { useEffect } from "react";
import Anouncement from "../../components/Anouncement/Anouncement";
import "./Cart.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cart = useSelector((state) => state.cart);

  return (
    <div className="cart">
      <div className="wrapper">
        <h1>YOUR CART</h1>
        <div className="top">
          <Link to="/products">
            <button className="shopping-btn">CONTINUE SHOPPING</button>
          </Link>
          <div className="texts">
            <div className="text">Shopping Bag({cart.products.length})</div>
            <div className="text">Your Wishlist(4)</div>
          </div>
          <button className="checkout-btn">CHECKOUT NOW</button>
        </div>
        <div className="bottom">
          <div className="info">
            {cart.products.map((item) => (
              <>
                <div className="product">
                  <div className="product-detail">
                    <img src={item.img[0]} alt="" />
                    <div className="details">
                      <div className="prouduct-name">
                        <b>Product:</b> {item.title}
                      </div>
                      <div className="product-id">
                        <b>Id:</b> {item._id}
                      </div>
                      <div className="product-price">
                        <b>Price:</b> Rs. {item.price}/Piece
                      </div>
                      <div className="product-size">
                        <b>Size:</b> {item.size}
                      </div>
                      <div
                        className="product-color"
                        style={{ backgroundColor: item.color }}
                      ></div>
                    </div>
                  </div>
                  <div className="price">
                    <div className="amount-container">
                      <Remove />
                      <div className="product-amount">{item.quantity}</div>
                      <Add />
                    </div>
                    <div className="product-price">
                      Rs. {item.price * item.quantity}
                    </div>
                  </div>
                </div>
                <hr className="line" />
              </>
            ))}
          </div>
          <div className="summary">
            <h1 className="summary-title">Order Summary</h1>
            <div className="summary-item">
              <span className="summary-item-text">Subtotal</span>
              <span className="summary-item-text">Rs. {cart.totalPrice}</span>
            </div>
            <div className="summary-item">
              <span className="summary-item-text">Estimated Shipping</span>
              <span className="summary-item-text">Rs. 50</span>
            </div>
            <div className="summary-item">
              <span className="summary-item-text">Shipping Discount</span>
              <span className="summary-item-text">Rs. -50</span>
            </div>
            <div className="summary-item total">
              <span className="summary-item-text">Total</span>
              <span className="summary-item-text">Rs. {cart.totalPrice}</span>
            </div>
            <button className="checkout-btn">CHECKOUT NOW</button>
          </div>
        </div>
      </div>
      <Anouncement />
    </div>
  );
};

export default Cart;
