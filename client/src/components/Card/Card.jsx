import "./Card.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ item }) => {
  console.log(item);

  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get("/products/find/" + item, {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzZjZDc2MDA0ZjE5NzQ5NDFiNjJiNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NDIzOTc0MiwiZXhwIjoxNjc0ODQ0NTQyfQ.ky9c50TwTn33bPSsNaYID4kVrrNrxbaFZ_QYEyDEmPQ",
        },
      });
      setProduct(res.data);
    };
    getProduct();
  }, []);

  // console.log(product?.img[0]);
  return (
    <Link
      to={`/product/${product._id}`}
      state={{ item: product }}
      className="link"
    >
      <div className="card">
        <div className="images">
          {product?.img?.map((img) => (
            <img src={img} className="img" title={product.title} />
          ))}
        </div>
        {/* <div className="detail">
          <div className="title">{product.title}</div>
          <div className="price">
            <p>Rs. {product.oldPrice}</p>
            <p>Rs. {product.price}</p>
          </div>
          <span className="new">{product.isNew && <p>New</p>}</span>
        </div> */}
      </div>
    </Link>
  );
};

export default Card;
