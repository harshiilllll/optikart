import { Link } from "react-router-dom";
import "./CategoryItem.scss";
import { Parallax } from "react-parallax";

const CategoryItem = ({ item }) => {
  return (
    <Parallax className="categoryItem" strength={300} bgImage={item.bgImg}>
      <div className="categoryItem">
        <Link className="link" to={`/products/${item.cat}`}>
          <div className="info">
            <h1>{item.title}</h1>
            <button>SHOP NOW</button>
          </div>
        </Link>
      </div>
    </Parallax>
  );
};

export default CategoryItem;
