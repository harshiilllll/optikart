import "./navbar.scss";
import {
  ShoppingCartOutlined,
  PersonOutlined,
  FavoriteBorderOutlined,
  KeyboardArrowDown,
  Search,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="wrapper">
        <ul className="left">
          <div className="icons">
            <PersonOutlined className="icon" />
            <KeyboardArrowDown className="icon" />
          </div>
          <li className="item">
            <Link className="link" to="/category/1" title="Men">
              Men
            </Link>
          </li>
          <li className="item">
            <Link className="link" to="/category/2" title="Women">
              Women
            </Link>
          </li>
          <li className="item">
            <Link className="link" to="/category/3" title="Kids">
              Kids
            </Link>
          </li>
        </ul>
        <div className="center">
          <img className="logo-img" src="img/LOGO.png" alt="" />
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
            <Link className="link" to="/category/2" title="About">
              About
            </Link>
          </li>
          <li className="item">
            <Link className="link" to="/category/3" title="Contact">
              Contact
            </Link>
          </li>
          <div className="icons">
            <Search className="icon" />
            <FavoriteBorderOutlined className="icon" />
            <div className="cart-icon">
              <ShoppingCartOutlined className="icon" />
              <span>2</span>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
