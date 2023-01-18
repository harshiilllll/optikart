import "./Card.scss";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <Link to={`/product/${item.id}`} state={{ item: item }} className="link">
      <div className="card">
        <div className="images">
          <img
            src={item.img[0]}
            alt={item.title}
            className="img"
            title={item.title}
          />
          <img
            src={item.img[1]}
            alt={item.title}
            className="img2"
            title={item.title}
          />
        </div>
        {/* <div className="detail">
          <div className="title">{item.title}</div>
          <div className="price">
            <p>Rs. {item.oldPrice}</p>
            <p>Rs. {item.price}</p>
          </div>
          <span className="new">{item.isNew && <p>New</p>}</span>
        </div> */}
      </div>
    </Link>
  );
};

export default Card;
