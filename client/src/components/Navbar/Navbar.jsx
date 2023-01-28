import "./navbar.scss";
import {
  ShoppingCartOutlined,
  PersonOutlined,
  FavoriteBorderOutlined,
  KeyboardArrowDown,
  KeyboardArrowRight,
  Search,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LOGO from "../../img/LOGO.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userRedux";

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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

  //Redux
  const quantity = useSelector((state) => state.cart.quantity);
  // console.log(quantity);

  const dispatch = useDispatch();

  const brandName = useSelector((state) => state.settings.brandName);

  return (
    <>
      <nav className={`navbar ${navbarClass}`}>
        <div className="wrapper">
          <ul className="left">
            <div className="icons">
              <PersonOutlined className="icon" />
              <KeyboardArrowDown className="icon" />
              <div className="options" onClick={() => dispatch(logout())}>
                LOGOUT
              </div>
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
            <button
              className={isOpen ? "isActive hamburger" : "hamburger"}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="bar"></div>
            </button>
            <Link to="/" className="logo">
              {brandName}
            </Link>
          </div>
          <ul className="right">
            <li className="item">
              <Link className="link" to="/" title="Home">
                Home
              </Link>
            </li>
            <li className="item">
              <Link className="link" to="/about" title="About">
                About
              </Link>
            </li>
            <li className="item">
              <Link className="link" to="/contact" title="Contact">
                Contact
              </Link>
            </li>
            <div className="icons">
              <Search className="icon" />
              <FavoriteBorderOutlined className="icon" />
              <div className="cart-icon">
                <Link to="/cart" className="link">
                  <ShoppingCartOutlined className="icon" />
                  {quantity > 0 && <span> </span>}
                </Link>
              </div>
            </div>
          </ul>
        </div>
        <nav className={isOpen ? "mobile-nav isOpen" : "mobile-nav"}>
          <Link
            to={`/`}
            className="link mob-nav-link"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to={`/about`}
            className="link mob-nav-link"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to={`/contact`}
            className="link mob-nav-link"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <div
            className="link mob-nav-link expandable"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Products{" "}
            <KeyboardArrowRight className={isExpanded ? "icon down" : "icon"} />
          </div>
          <div
            className={
              isExpanded
                ? "link mob-nav-link expandable-menu isExpanded"
                : "link mob-nav-link expandable-menu"
            }
          >
            <Link className="link" onClick={() => setIsOpen(false)}>
              Eyeglasses
            </Link>
            <Link className="link" onClick={() => setIsOpen(false)}>
              Sunglasses
            </Link>
          </div>
        </nav>
      </nav>
    </>
  );
};

export default Navbar;
