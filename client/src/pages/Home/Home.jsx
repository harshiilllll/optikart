import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Anouncement from "../../components/Anouncement/Anouncement";
import Category from "../../components/Category/Category";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Newsletter from "../../components/Newsletter/Newsletter";
import Slider from "../../components/Slider/Slider";

const Home = () => {
  
  const [lists, setLists] = useState([]);
  useEffect(() => {
    const getLists = async () => {
      const res = await axios.get("/lists", {
        headers: {
          token:
            "Bearer " +
            JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
              .user.accessToken,
        },
      });
      setLists(res.data);
    };
    getLists();
  }, []);

  return (
    <div>
      <Slider />
      {lists?.map((list) => (
        <FeaturedProducts key={list._id} list={list} />
      ))}
      <Category />
      <Anouncement />
      <Newsletter />
    </div>
  );
};

export default Home;
