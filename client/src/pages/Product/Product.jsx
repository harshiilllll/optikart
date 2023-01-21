import "./Product.scss";
import { useLocation } from "react-router-dom";
import Newsletter from "../../components/Newsletter/Newsletter";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";
import { addProduct } from "../../redux/cartRedux";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const item = useLocation().state.item;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(item.color[0]);
  const [size, setSize] = useState(item.size[0]);

  console.log(item);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuantityAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityRemove = () => {
    setQuantity(quantity - 1);
  };

  const handleClick = () => {
    //update cart
    dispatch(addProduct({ ...item, quantity, color, size }));
    toast.success("Added to cart successfully!");
  };

  return (
    <>
      <div className="product">
        <div className="images">
          {item.img?.map((image) => (
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
              {item.color?.map((c) => (
                <div
                  className="color"
                  key={c}
                  style={{
                    backgroundColor: c,
                    outline: color === c ? "2px solid black" : "none",
                    outlineOffset: "1px",
                  }}
                  onClick={() => setColor(c)}
                ></div>
              ))}
            </div>
            <div className="size">
              <span>Size:</span>
              <select
                name="size"
                id="size"
                onChange={(e) => setSize(e.target.value)}
              >
                {item.size?.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="quantity">
            <RemoveIcon onClick={handleQuantityRemove} className="icon" />
            <span className="text">{quantity}</span>
            <AddIcon onClick={handleQuantityAdd} className="icon" />
          </div>
          <div className="buttons">
            <button className="buy-btn">
              <LocalMallRoundedIcon />
              Buy Now
            </button>
            <button className="cart-btn" onClick={handleClick}>
              <ShoppingCartOutlinedIcon />
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <Newsletter />
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default Product;
