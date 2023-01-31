import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Anouncement from "../../components/Anouncement/Anouncement";
import Category from "../../components/Category/Category";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import HomeCategories from "../../components/homeCategories/HomeCategories";
import Newsletter from "../../components/Newsletter/Newsletter";
import ParallaxArea from "../../components/ParallaxArea/ParallaxArea";
import Slider from "../../components/Slider/Slider";

const Home = () => {
  const [lists, setLists] = useState([]);
  useEffect(() => {
    const getLists = async () => {
      const res = await axios.get("/lists");
      setLists(res.data);
    };
    getLists();
  }, []);

  return (
    <div>
      <Slider />
      <HomeCategories />
      {lists?.slice(0, 2).map((list) => (
        <FeaturedProducts key={list._id} list={list} />
      ))}
      <Category />
      {lists?.slice(2).map((list) => (
        <FeaturedProducts key={list._id} list={list} />
      ))}
      <ParallaxArea
        title="Shade your style"
        bgImg="https://images.pexels.com/photos/13174475/pexels-photo-13174475.jpeg?auto=compress&cs=tinysrgb&w=600"
        direction={"row"}
        content="Our featured sunglasses collection offers a wide variety of styles to suit every taste and face shape. From classic aviators to trendy cat-eye frames, we have something for everyone. Made with high-quality materials and featuring UV protection, our featured glasses not only look great, but also protect your eyes from harmful rays."
      />
      <ParallaxArea
        title="Elevate your look"
        bgImg="https://images.pexels.com/photos/12891383/pexels-photo-12891383.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        direction={"row-reverse"}
        content="In addition to being fashionable, our featured sunglasses are also highly functional. Many of our frames feature polarized lenses that reduce glare and improve visibility, making them perfect for outdoor activities like fishing, boating, and driving."
      />
      <Anouncement />
      <Newsletter />
    </div>
  );
};

export default Home;
