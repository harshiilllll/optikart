import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./Success.scss";

const Success = () => {
  // const [orderedProducts, setOrderedProducts] = useState([]);
  const userId = useSelector((state) => state.user.user._id);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const addProductsInOrder = async () => {
      try {
        await axios.put("/orders/?userId=" + userId, {
          product_info: cart.products.map((product) => ({
            productId: product._id,
            price: product.price,
            size: product.size,
            color: product.color,
            quantity: product.quantity,
            img: product.img,
            desc: product.desc,
            title: product.title,
          })),
        });
      } catch {}
    };
    addProductsInOrder();
  }, [cart.products, userId]);

  // useEffect(() => {
  //   const getOrederdProducts = async () => {
  //     try {
  //       const res = await axios.get("/orders/find/" + userId, {
  //         headers: {
  //           token:
  //             "Bearer " +
  //             JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
  //               .user.accessToken,
  //         },
  //       });
  //       setOrderedProducts(res.data);
  //     } catch {}
  //   };
  //   getOrederdProducts();
  // }, [userId]);
  // console.log(orderedProducts?.products);

  return (
    <div className="success">
      <div className="top">
        <h2>Thank You!</h2>
        <h1>It's on the way!</h1>
        <span>
          {/* Your order <b>#{orderedProducts?._id}</b> has been shipped and will be */}
          with you soon.
        </span>
      </div>
      {/* {orderedProducts?.products?.map((product) => ( */}
      {/* <div key={product?._id} className="center">
        <div className="image">
          <img src={product.img} alt="" />
        </div>
        <div className="info">
          <div className="info-top">
            <h2>{product.title}</h2>
            <p>{product.desc}</p>
          </div>
          <div className="info-bottom">
            <span>
              <b>Quantity</b> {product.quantity}
            </span>
            <span>
              <b> Price </b>
              {product.price}
            </span>
          </div>
        </div>
      </div> */}
      {/* ))} */}
      <div className="bottom">We will send you details on your email.</div>
    </div>
  );
};

export default Success;
