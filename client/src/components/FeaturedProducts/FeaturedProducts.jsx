import "./featuredProducts.scss";
import Card from "../Card/Card";

const FeaturedProducts = ({ title }) => {

  const data = [
    {
      id: 1,
      img: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//j/i/Gold-Blue-Full-Rim-Hexagon-John-Jacobs-JJ-Tints-JJ-S12472-C3-Sunglasses_john-jacobs-jj-s12472-c3-sunglasses_sunglasses_g_1962_1_118_02_2022.jpg",
      img2: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-s11188-c2-sunglasses_sunglasses_g_1326_1.jpg",
      title: "Jhon Jacobs Full rim hexagon",
      isNew: true,
      oldPrice: 1900,
      price: 1500
    },
    {
      id: 2,
      img: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//j/i/Gold-Brown-Green-Full-Rim-Round-John-Jacobs-JJ-TINTS-JJ-S12810-C2-Polarized-Sunglasses_john-jacobs-jj-s12810-c2-sunglasses_sunglasses_G_1703_118_02_2022.jpg",
      img2: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-s11188-c2-sunglasses_sunglasses_g_1326_1.jpg",
      title: "Jhon Jacobs Gold brown tint rim hexagon",
      isNew: false,
      oldPrice: 2100,
      price: 1800
    },
    {
      id: 3,
      img: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//j/i/Silver-Grey-Mirror-Full-Rim-Square-John-Jacobs-JJ-Tints-JJ-S12503-C4-Polarized-Sunglasses_john-jacobs-full-rim-aviator-jj-s12503-c4-sunglasses_sunglasses_sunglasses_g_1797_1_118_02_2022.jpg",
      img2: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-s11188-c2-sunglasses_sunglasses_g_1326_1.jpg",
      title: "Jhon Jacobs Sunglasses",
      isNew: true,
      oldPrice: 1800,
      price: 1300
    },
    {
      id: 4,
      img: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/Vincent-Chase-VC-S14457-C3-Sunglasses_G_7067.jpg",
      img2: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-s11188-c2-sunglasses_sunglasses_g_1326_1.jpg",
      title: "Sunglasses",
      isNew: false,
      oldPrice: 1700,
      price: 1200
    }
  ]

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="bottom">
        {data?.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
