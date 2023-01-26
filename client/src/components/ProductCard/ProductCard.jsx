import "./ProductCard.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <div className="product-card">
      <div className="badge">{item.isNew && "New"}</div>
      <div className="product-tumb">
        <Link to={`/product/${item._id}`} state={{ item: item }}>
          <img className="img1" src={item.img[0]} alt="" />
          {item.img[1] && <img className="img2" src={item.img[1]} alt="" />}
        </Link>
      </div>
      <div className="product-details">
        {item.categories.map((c) => (
          <span key={c} className="product-catagory">
            {c}
          </span>
        ))}
        <h4>
          <Link to={`/product/${item._id}`} state={{ item: item }}>
            {item.title}
          </Link>
        </h4>
        <p className="desc">{item.desc}</p>
        <div className="product-bottom-details">
          <div className="product-price">
            <small>Rs. {item.oldPrice}</small>Rs. {item.price}
          </div>
          <div className="product-links">
            <Link to="">
              <FavoriteBorderIcon />
            </Link>
            <Link to="">
              <ShoppingCartOutlinedIcon />
            </Link>
          </div>
          <div className="colors">
            {item.color.map((c) => (
              <div
                key={c}
                className="color"
                style={{
                  marginInlineEnd: "3px",
                  backgroundColor: c,
                  height: "12px",
                  width: "12px",
                  borderRadius: "50%",
                  border: "1px solid black",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
