import "./category.scss";
import CategoryItem from "../CategoryItem/CategoryItem";

const Category = () => {
  const data = [
    {
      id: 1,
      img: "https://images.pexels.com/photos/14755201/pexels-photo-14755201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "EYE GLASSES",
      cat: "Unisex",
    },
    {
      id: 2,
      img: "https://images.pexels.com/photos/13142472/pexels-photo-13142472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "SUNGLASSES",
      cat: "Comfort",
    },
    {
      id: 3,
      img: "https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      title: "CONTACT LENSES",
      cat: "Sunglasses",
    },
  ];

  return (
    <div className="category">
      {data.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Category;
