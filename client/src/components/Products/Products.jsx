import ProductCard from "../ProductCard/ProductCard";
import "./Products.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

const Products = ({ category, filters, sort, clearFilters }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const search = useLocation().search;
  useEffect(() => {
    const getProducts = async () => {
      try {
        let url = category ? `/products?category=${category}` : "/products";
        if (search) {
          url = `/products/search${search}`;
        }
        const res = await axios.get(url);
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [category, search]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(
          ([key, value]) =>
            item[key].includes(value) ||
            item.size === value ||
            item.color === value
        )
      )
    );
  }, [products, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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

  useEffect(() => {
    clearFilters();
  }, [category]);

  return (
    <div className="products">
      {loading === true && <Loader />}
      {loading === false && filteredProducts.length === 0 && (
        <>
          <h1>No products at the moment.</h1>
          <Link
            to={`/products`}
            className="link"
            style={{ textDecoration: "underline" }}
          >
            Browse All Products
          </Link>
        </>
      )}
      {filteredProducts.map((item) => (
        <ProductCard forHome={false} item={item} key={item._id} />
      ))}
    </div>
  );
};

export default Products;
