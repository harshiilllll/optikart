import { Add, Remove } from "@mui/icons-material";
import React, { useEffect } from "react";
import Anouncement from "../../components/Anouncement/Anouncement";
import "./Cart.scss";

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="cart">
      <div className="wrapper">
        <h1>YOUR CART</h1>
        <div className="top">
          <button className="shopping-btn">CONTINUE SHOPPING</button>
          <div className="texts">
            <div className="text">Shopping Bag(2)</div>
            <div className="text">Your Wishlist(4)</div>
          </div>
          <button className="checkout-btn">CHECKOUT NOW</button>
        </div>
        <div className="bottom">
          <div className="info">
            <div className="product">
              <div className="product-detail">
                <img
                  src="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//j/i/Gold-Blue-Full-Rim-Hexagon-John-Jacobs-JJ-Tints-JJ-S12472-C3-Sunglasses_john-jacobs-jj-s12472-c3-sunglasses_sunglasses_g_1962_1_118_02_2022.jpg"
                  alt=""
                />
                <div className="details">
                  <div className="prouduct-name">
                    <b>Product:</b> Jhon Jacobs Sunglasses
                  </div>
                  <div className="product-id">
                    <b>Id:</b> 8u27979dw898
                  </div>
                  <div className="product-color"></div>
                  <div className="product-size">
                    <b>Size:</b> medium
                  </div>
                </div>
              </div>
              <div className="price">
                <div className="amount-container">
                  <Remove />
                  <div className="product-amount">2</div>
                  <Add />
                </div>
                <div className="product-price">Rs. 4999</div>
              </div>
            </div>
            <hr className="line" />
            <div className="product">
              <div className="product-detail">
                <img
                  src="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//j/i/Brown-Green-Full-Rim-Round-John-Jacobs-JJ-Tints-JJ-S12432-C3-Polarized-Sunglasses_john-jacobs-jj-s12432-c3-sunglasses_sunglasses_g_6612_118_02_2022.jpg"
                  alt=""
                />
                <div className="details">
                  <div className="prouduct-name">
                    <b>Product:</b> Cat Eye Sunglasses
                  </div>
                  <div className="product-id">
                    <b>Id:</b> 9892893jns98
                  </div>
                  <div className="product-color"></div>
                  <div className="product-size">
                    <b>Size:</b> small
                  </div>
                </div>
              </div>
              <div className="price">
                <div className="amount-container">
                  <Remove />
                  <div className="product-amount">1</div>
                  <Add />
                </div>
                <div className="product-price">Rs. 3999</div>
              </div>
            </div>
          </div>
          <div className="summary">
            <h1 className="summary-title">Order Summary</h1>
            <div className="summary-item">
              <span className="summary-item-text">Subtotal</span>
              <span className="summary-item-text">Rs. 9998</span>
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
              <span className="summary-item-text">Rs. 9998</span>
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
