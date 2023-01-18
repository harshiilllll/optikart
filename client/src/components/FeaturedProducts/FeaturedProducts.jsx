import "./featuredProducts.scss";
import Card from "../Card/Card";
import { demoData } from "../../demoData";

const FeaturedProducts = ({ title }) => {

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>
      </div>
      <div className="bottom">
        {demoData?.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
