import "./Card.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ item }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get("/products/find/" + item, {
        headers: {
          token:
            "Bearer " +
            JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
              .user.accessToken,
        },
      });
      setProduct(res.data);
    };
    getProduct();
  }, [item]);

  // console.log(product?.img[0]);
  return (
    <Link
      to={`/product/${product?._id}`}
      state={{ item: product }}
      className="link"
    >
      <div className="card">
        <div className="images">
          <img src={product.img} className="img" title={product.title} alt="" />
          <img
            src={product.img}
            className="img"
            title={product.title}
            alt=""
          />
        </div>
        {/* <div className="detail">
          <div className="title">{product.title}</div>
          <div className="price">
            <p>Rs. {product.price}</p>
          </div>
          <span className="new">{product.isNew && <p>New</p>}</span>
        </div> */}
      </div>
    </Link>
  );
};

export default Card;
