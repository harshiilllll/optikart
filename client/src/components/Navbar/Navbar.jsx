import "./navbar.scss";
import {
  ShoppingCartOutlined,
  PersonOutlined,
  FavoriteBorderOutlined,
  KeyboardArrowDown,
  KeyboardArrowRight,
  Search,
  CloseOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LOGO from "../../img/LOGO.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userRedux";
import { useRef } from "react";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedB, setIsExpandedB] = useState(false);

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

  useEffect(() => {
    window.addEventListener("scroll", handleCloseSearch);
    return () => window.removeEventListener("scroll", handleCloseSearch);
  }, []);

  const handleCloseSearch = () => {
    setIsOpenSearch(false);
  };

  //Search
  const searchRef = useRef(null);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!q) return;
    navigate(`/products/search?q=${q}`);
    setIsOpenSearch(false);
  };

  //Autofocus on search open
  useEffect(() => {
    if (isOpenSearch) {
      searchRef.current.focus();
      searchRef.current.value = "";
    }
  }, [isOpenSearch]);

  //Shortcut keys
  const handleKeyPress = (event) => {
    if (event.key === " " && !isOpenSearch) {
      setIsOpenSearch(true);
    }
    if (event.key === "Escape" && isOpenSearch) {
      setIsOpenSearch(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpenSearch]);

  return (
    <>
      <nav className={`navbar ${navbarClass}`}>
        <div className="wrapper">
          <ul className="left">
            <div className="icons">
              <PersonOutlined className="icon" />
              <KeyboardArrowDown className="icon" />
              <div className="options" onClick={() => dispatch(logout())}>
                {user ? (
                  <Link
                    to={`/`}
                    className="link"
                    onClick={() => dispatch(logout())}
                  >
                    LOGOUT
                  </Link>
                ) : (
                  <Link
                    to={`/login`}
                    className="link"
                    onClick={() => setIsOpen(false)}
                  >
                    LOGIN
                  </Link>
                )}
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
            <button
              className={isOpen ? "isActive hamburger" : "hamburger"}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="bar"></div>
            </button>
            <img className="logo-img" src={LOGO} alt="" />
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
              <Search
                className="icon"
                onClick={() => setIsOpenSearch(!isOpenSearch)}
              />
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
        <form
          onSubmit={handleSearch}
          className={
            isOpenSearch ? `search-container search-opened` : "search-container"
          }
        >
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter keywords..."
              ref={searchRef}
              onChange={(e) => {
                setQ(e.target.value);
              }}
            />
            <Search className="search-icon" />
          </div>
          <CloseOutlined
            className="close-icon"
            onClick={() => setIsOpenSearch(false)}
          />
        </form>
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
            <Link
              className="link"
              to={`/products/eyeglasses`}
              onClick={() => setIsOpen(false)}
            >
              Eyeglasses
            </Link>
            <Link
              className="link"
              to={`/products/sunglasses`}
              onClick={() => setIsOpen(false)}
            >
              Sunglasses
            </Link>
            <Link
              className="link"
              to={`/products`}
              onClick={() => setIsOpen(false)}
            >
              All products
            </Link>
          </div>
          <div
            className="link mob-nav-link expandable"
            onClick={() => setIsExpandedB(!isExpandedB)}
          >
            For{" "}
            <KeyboardArrowRight
              className={isExpandedB ? "icon down" : "icon"}
            />
          </div>
          <div
            className={
              isExpandedB
                ? "link mob-nav-link expandable-menu isExpanded"
                : "link mob-nav-link expandable-menu"
            }
          >
            <Link
              className="link"
              to={`/products/men`}
              onClick={() => setIsOpen(false)}
            >
              Men's
            </Link>
            <Link
              className="link"
              to={`/products/women`}
              onClick={() => setIsOpen(false)}
            >
              Women's
            </Link>
          </div>
          {user ? (
            <Link to={`/`} onClick={() => dispatch(logout())}>
              <button className="logout-btn">LOGOUT</button>
            </Link>
          ) : (
            <Link to={`/login`} onClick={() => setIsOpen(false)}>
              <button className="logout-btn">LOGIN</button>
            </Link>
          )}
        </nav>
      </nav>
    </>
  );
};

export default Navbar;
