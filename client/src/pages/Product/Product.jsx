import "./Product.scss";
import { useLocation } from "react-router-dom";
import Newsletter from "../../components/Newsletter/Newsletter";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const item = useLocation().state.item;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuantityAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityRemove = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      <div className="product">
        <div className="images">
          {item?.img.map((image) => (
            <img key={image} src={image} alt="" />
          ))}
        </div>
        <div className="info">
          <h1 className="productTitle">{item.title}</h1>
          {item.inStock ? <p>Available</p> : <p>Not available</p>}
          <p className="productDesc">{item.desc}</p>
          <div className="price">
            <h1>Rs. {item?.oldPrice}</h1>
            <h1>Rs. {item.price}</h1>
          </div>
          <div className="options">
            <div className="colors">
              <span>Color:</span>
              {item?.color.map((color) => (
                <div
                  className="color"
                  key={color}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
            <div className="size">
              <span>Size:</span>
              <select name="size" id="size">
                {item?.size.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="quantity">
            <RemoveIcon onClick={handleQuantityAdd} className="icon" />
            <span className="text">{quantity}</span>
            <AddIcon onClick={handleQuantityRemove} className="icon" />
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
