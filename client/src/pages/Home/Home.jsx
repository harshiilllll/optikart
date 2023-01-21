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
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzZjZDc2MDA0ZjE5NzQ5NDFiNjJiNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NDIzOTc0MiwiZXhwIjoxNjc0ODQ0NTQyfQ.ky9c50TwTn33bPSsNaYID4kVrrNrxbaFZ_QYEyDEmPQ",
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