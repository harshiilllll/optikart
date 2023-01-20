import "./ProductCard.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <Link
      to={`/product/${item._id}`}
      state={{ item: item }}
      className="productCard link"
    >
      <div className="icons">
        <FavoriteBorderIcon />
      </div>
      <div className="images">
        <img className="img" src={item.img[0]} alt="" />
        {item.img[1] && <img className="img2" src={item.img[1]} alt="" />}
      </div>
      <div className="detail">
        <div className="title">{item.title}</div>
        <div className="price">
          <p>Rs. {item.oldPrice}</p>
          <p>Rs .{item.price}</p>
        </div>
        <button>
          <ShoppingCartOutlinedIcon /> Add to cart
        </button>
        <div className="bottom">
          <div className="color">{item.color}</div>
          <div className="size">{item.size}</div>
          -have to fix this later
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
