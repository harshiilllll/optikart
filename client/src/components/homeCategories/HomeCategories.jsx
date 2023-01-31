import React, { useEffect } from "react";
import { useState } from "react";
import "./HomeCategories.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const HomeCategories = () => {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="homeCategories">
      {cats.map((cat) => (
        <Link
          to={`/products/${cat.cat}`}
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${cat.bgImg})`,
            backgroundSize: "cover",
          }}
          className="link cat"
          key={cat._id}
        >
          {cat.cat}
        </Link>
      ))}
    </div>
  );
};

export default HomeCategories;
