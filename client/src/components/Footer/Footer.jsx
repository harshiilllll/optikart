import { EmailRounded, PhoneIphoneRounded } from "@mui/icons-material";
import React from "react";
import "./footer.scss";
import paymentImg from "../../img/payment.png";
import { useSelector } from "react-redux";

const Footer = () => {
  const brand = useSelector((state) => state.settings);
  return (
    <div className="footer">
      <div className="top">
        {/* <div className="item subscribe">
          <h1>Stay in the know.</h1>
          <input type="text" placeholder="Email" />
          <button>Subscribe</button>
        </div> */}
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
        <div className="item contact-footer">
          <h1>Contact</h1>
          <p>{brand.address}</p>
          <a className="link" href="mailto:">
            <EmailRounded />
            {brand.brandEmail}
          </a>
          <a className="link" href="tel:">
            <PhoneIphoneRounded />
            {brand.brandNumber}
          </a>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <div>
            <div className="logo">{brand.brandName}</div>
            <div className="copyright">
              &copy; Copyright 2023 - All rights reserved.
            </div>
          </div>
        </div>
        <img src={paymentImg} alt="" />
      </div>
    </div>
  );
};

export default Footer;
