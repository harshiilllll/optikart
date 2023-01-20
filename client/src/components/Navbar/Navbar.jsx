import "./navbar.scss";
import {
  ShoppingCartOutlined,
  PersonOutlined,
  FavoriteBorderOutlined,
  KeyboardArrowDown,
  Search,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LOGO from "../../img/LOGO.png";

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };

  const navbarClass = scrollPosition > 10 ? "scrolled" : "";

  return (
    <nav className={`navbar ${navbarClass}`}>
      <div className="wrapper">
        <ul className="left">
          <div className="icons">
            <PersonOutlined className="icon" />
            <KeyboardArrowDown className="icon" />
          </div>
          <li className="item">
            <Link className="link" to="/products/men" title="Men">
              Men
            </Link>
          </li>
          <li className="item">
            <Link className="link" to="/products/women" title="Women">
              Women
            </Link>
          </li>
          <li className="item">
            <Link className="link" to="/products/kids" title="Kids">
              Kids
            </Link>
          </li>
        </ul>
        <div className="center">
          <img className="logo-img" src={LOGO} alt="" />
          <button className="hamburger">
            <div className="bar"></div>
          </button>
          <Link to="/" className="logo">
            OPTIKART
          </Link>
        </div>
        <ul className="right">
          <li className="item">
            <Link className="link" to="/" title="Home">
              Home
            </Link>
          </li>
          <li className="item">
            <Link className="link" to="/products/2" title="About">
              About
            </Link>
          </li>
          <li className="item">
            <Link className="link" to="/products/3" title="Contact">
              Contact
            </Link>
          </li>
          <div className="icons">
            <Search className="icon" />
            <FavoriteBorderOutlined className="icon" />
            <div className="cart-icon">
              <Link to="/cart" className="link">
                <ShoppingCartOutlined className="icon" />
                <span>2</span>
              </Link>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
