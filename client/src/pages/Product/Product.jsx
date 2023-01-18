import "./Product.scss";
import { useLocation } from "react-router-dom";
import Newsletter from "../../components/Newsletter/Newsletter";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import { useEffect } from "react";

const Product = () => {
  const item = useLocation().state.item;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="product">
        <div className="images">
          <img src={item.img[1]} alt="" />
          <img src={item.img[0]} alt="" />
        </div>
        <div className="info">
          <h1 className="productTitle">{item.title}</h1>
          {item.inStock ? <p>Available</p> : <p>Not available</p>}
          <p className="productDesc">{item.desc}</p>
          <div className="price">
            <h1>Rs. {item.price}</h1>
            <h1>Rs. {item.oldPrice}</h1>
          </div>
          <div className="options">
            <div className="colors">
              <span>Color:</span>
              <div
                className="color"
                style={{ backgroundColor: item.color[0] }}
              ></div>
              <div
                className="color"
                style={{ backgroundColor: item.color[1] }}
              ></div>
              <div
                className="color"
                style={{ backgroundColor: item.color[2] }}
              ></div>
            </div>
            <div className="size">
              <span>Size:</span>
              <select name="size" id="size">
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
              </select>
            </div>
          </div>
          <div className="buttons">
            <button className="buy-btn">
              <LocalMallRoundedIcon />
              Buy Now
            </button>
            <button className="cart-btn">
              <ShoppingCartOutlinedIcon />
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <Newsletter />
    </>
  );
};

export default Product;
