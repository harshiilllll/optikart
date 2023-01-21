import "./ProductCard.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    // <Link
    //   to={`/product/${item._id}`}
    //   state={{ item: item }}
    //   className="productCard link"
    // >
    //   <div className="icons">
    //     <FavoriteBorderIcon />
    //   </div>
    //   <div className="images">
    //     <img className="img" src={item.img[0]} alt="" />
    //     {item.img[1] && <img className="img2" src={item.img[1]} alt="" />}
    //   </div>
    //   <div className="detail">
    //     <div className="title">{item.title}</div>
    //     <div className="price">
    //       <p>Rs. {item.oldPrice}</p>
    //       <p>Rs .{item.price}</p>
    //     </div>
    //     <div className="bottom">
    //       <div className="colors">
    //         {item.color.map((c) => (
    //           <div className="color" style={{ backgroundColor: c }}></div>
    //         ))}
    //       </div>
    //       <div className="size">{item.size}</div>
    //     </div>
    //     <button>
    //       <ShoppingCartOutlinedIcon /> Add to cart
    //     </button>
    //   </div>
    // </Link>
    <div class="product-card">
      <div class="badge">{item.isNew && "New"}</div>
      <div class="product-tumb">
        <Link to={`/product/${item._id}`} state={{ item: item }}>
          <img className="img1" src={item.img[0]} alt="" />
          {item.img[1] && <img className="img2" src={item.img[1]} alt="" />}
        </Link>
      </div>
      <div class="product-details">
        {item.categories.map((c) => (
          <span class="product-catagory">{c}</span>
        ))}
        <h4>
          <Link to={`/product/${item._id}`} state={{ item: item }}>
            {item.title}
          </Link>
        </h4>
        <p className="desc">{item.desc}</p>
        <div class="product-bottom-details">
          <div class="product-price">
            <small>Rs. {item.oldPrice}</small>Rs. {item.price}
          </div>
          <div class="product-links">
            <Link to="">
              <FavoriteBorderIcon />
            </Link>
            <Link to="">
              <ShoppingCartOutlinedIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
