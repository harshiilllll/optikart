import { useEffect } from "react";
import Newsletter from "../../components/Newsletter/Newsletter";
import Products from "../../components/Products/Products";
import "./ProductList.scss";

const ProductList = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="productList">
        <h1 className="heading">Sunglasses</h1>
        <div className="filterContainer">
          <div className="filter">
            <span className="filterText">Filter Products:</span>
            <select defaultValue="Select a color" name="color">
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
            <select defaultValue="Select size" name="size">
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
            <select defaultValue="Sort by" name="sort">
              <option value="" disabled>
                Sort by
              </option>
              <option value="Newest">Newest</option>
              <option value="Price (acs)">Price (acs)</option>
              <option value="Price (dsc)">Price (dsc)</option>
            </select>
          </div>
        </div>
        <Products />
      </div>
      <Newsletter />
    </>
  );
};

export default ProductList;
