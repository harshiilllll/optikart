import "./featuredProducts.scss";
import Card from "../Card/Card";

const FeaturedProducts = ({ list }) => {
  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{list.title}</h1>
        <p>{list.desc}</p>
      </div>
      <div className="bottom">
        {list.content.map((item) => (
          <Card item={item} key={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
