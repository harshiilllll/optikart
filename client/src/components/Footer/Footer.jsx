import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span>Men</span>
          <span>Women</span>
          <span>Kids</span>
          <span>New Arrivals</span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
          <span>FAQ's</span>
        </div>
        <div className="item">
          <h1>Products</h1>
          <span>Sunglasses</span>
          <span>Eyeglasses</span>
          <span>Contact Lenses</span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <p>1 10th Street, Brownwood,tx, 36801 United States</p>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <div className="logo">OPTIKART</div>
          <div className="copyright">
            &copy; Copyright 2023 - All rights reserved.
          </div>
        </div>
        <img src="img/payment.png" alt="" />
      </div>
    </div>
  );
};

export default Footer;
