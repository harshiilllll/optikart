import ProductCard from "../ProductCard/ProductCard";
import "./Products.scss";
import { demoData } from "../../demoData";

const Products = () => {

  return (
    <div className="products">
      {demoData.map((item) => (
        <ProductCard item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Products;
