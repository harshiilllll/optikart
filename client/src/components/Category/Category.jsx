import "./category.scss";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className="category">
      <div className="col">
        <div className="row">
          <img
            src="https://images.unsplash.com/photo-1569098446737-c22abf95abf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"
            alt=""
          />
          <button>
            <Link to="category/1" className="link">Men</Link>
          </button>
        </div>
        <div className="row">
          <img
            src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt=""
          />
          <button>
            <Link to="category/1" className="link">Women</Link>
          </button>
        </div>
      </div>
      <div className="col">
        <div className="row">
          <img
            src="https://media.istockphoto.com/id/637856726/photo/shes-a-ray-of-sunshine.jpg?b=1&s=612x612&w=0&k=20&c=yLGaDDW8irlzKmTrBGqD_a933QeFRPnQ30FncEYHXZo="
            alt=""
          />
          <button>
            <Link to="category/1" className="link">Kids</Link>
          </button>
        </div>
      </div>
      <div className="col col-lg">
        <div className="row">
          <div className="col">
            <div className="row">
              <img
                src="https://i.pinimg.com/originals/7a/cf/9d/7acf9dc3d49b007c4d4887126c7c4178.png"
                alt=""
              />
              <button>
                <Link to="category/1" className="link">Sunglasses</Link>
              </button>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <img
                src="https://images.pexels.com/photos/5342002/pexels-photo-5342002.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <button>
                <Link to="category/1" className="link">Eye Glases</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <img
            src="https://images.pexels.com/photos/15048318/pexels-photo-15048318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <button>
            <Link to="category/1" className="link">Contact Lenses</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
