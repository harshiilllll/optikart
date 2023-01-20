import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Newsletter from "../../components/Newsletter/Newsletter";
import Products from "../../components/Products/Products";
import "./ProductList.scss";

const ProductList = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const category = location.pathname.split("/")[2];

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <>
      <div className="productList">
        <h1 className="heading">{category} Glasses</h1>
        <div className="filterContainer">
          <div className="filter">
            <span className="filterText">Filter Products:</span>
            <select
              onChange={handleFilters}
              defaultValue="Select a color"
              name="color"
            >
              <option value="" disabled>
                Select a color
              </option>
              <option value="Gold">Gold</option>
              <option value="Black">Black</option>
              <option value="Tortoise">Tortoise</option>
              <option value="Pink">Pink</option>
              <option value="Yellow">Yellow</option>
              <option value="Silver">Silver</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Red">Red</option>
            </select>
            <select
              onChange={handleFilters}
              defaultValue="Select size"
              name="size"
            >
              <option value="" disabled>
                Select frame size
              </option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="filter">
            <span className="filterText">Sort porducts:</span>
            <select
              onChange={(e) => setSort(e.target.value)}
              defaultValue="Sort by"
              name="sort"
            >
              <option value="" disabled>
                Sort by
              </option>
              <option value="newest">Newest</option>
              <option value="asc">Price (acs)</option>
              <option value="dsc">Price (dsc)</option>
            </select>
          </div>
        </div>
        <Products filters={filters} sort={sort} category={category} />
      </div>
      <Newsletter />
    </>
  );
};

export default ProductList;
