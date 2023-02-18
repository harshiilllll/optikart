import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./CartPopup.scss";

const CartPopup = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  return (
    <div className="cartPopup">
      <h1>Cart</h1>
      <div className="products">
        {cart?.products?.map((product) => (
          <div key={product._id}>
            <img src={product.img[0]} alt="" />
            {product.title}
          </div>
        ))}
      </div>
      <Link className="link button" to="/cart">
        View Cart
      </Link>
    </div>
  );
};

export default CartPopup;
