import { Link } from "react-router-dom";
import "./CategoryItem.scss";

const CategoryItem = ({ item }) => {
  return (
    <div className="categoryItem">
      <Link className="link" to={`/products/${item.cat}`}>
        <img src={item.img} alt="" />
        <div className="info">
          <h1>{item.title}</h1>
          <button>SHOP NOW</button>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
