import { EmailRounded, PhoneIphoneRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "./footer.scss";
import paymentImg from "../../img/payment.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const Footer = () => {
  const brand = useSelector((state) => state.settings);

  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

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
          {cats.map((cat) => (
            <span key={cat._id}>
              <Link className="link" to={`products/${cat.cat}`}>
                {cat.title}
              </Link>
            </span>
          ))}
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
