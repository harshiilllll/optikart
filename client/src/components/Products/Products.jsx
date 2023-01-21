import ProductCard from "../ProductCard/ProductCard";
import "./Products.scss";
import { demoData } from "../../demoData";
import axios from "axios";
import { useEffect, useState } from "react";

const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category ? `/products?category=${category}` : "/products",
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzZjZDc2MDA0ZjE5NzQ5NDFiNjJiNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NDIzOTc0MiwiZXhwIjoxNjc0ODQ0NTQyfQ.ky9c50TwTn33bPSsNaYID4kVrrNrxbaFZ_QYEyDEmPQ",
            },
          }
        );
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <div className="products">
      {filteredProducts.map((item) => (
        <ProductCard item={item} key={item._id} />
      ))}
    </div>
  );
};

export default Products;
