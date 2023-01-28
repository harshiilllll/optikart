import "./category.scss";
import CategoryItem from "../CategoryItem/CategoryItem";
import { useEffect, useState } from "react";
import axios from "axios";

const Category = () => {
  //fetch categories
  const [cat, setCat] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("/categories", {
          headers: {
            token:
              "Bearer " +
              JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
                .user.accessToken,
          },
        });
        setCat(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  return (
    <div className="category">
      {cat.slice(0, 3).map((item) => (
        <CategoryItem item={item} key={item._id} />
      ))}
    </div>
  );
};

export default Category;
