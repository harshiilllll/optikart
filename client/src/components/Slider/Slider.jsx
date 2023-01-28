import React, { useCallback, useEffect, useState } from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import "./slider.scss";
import axios from "axios";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    const getSlider = async () => {
      try {
        const res = await axios.get("/slider", {
          headers: {
            token:
              "Bearer " +
              JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
                .user.accessToken,
          },
        });
        setSlider(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSlider();
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      currentSlide === 0 ? slider.length - 1 : (prev) => prev - 1
    );
  }, [currentSlide, slider.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide(
      currentSlide === slider.length - 1 ? 0 : (prev) => prev + 1
    );
  }, [currentSlide, slider.length]);

  //To change next slide automatically
  useEffect(() => {
    const intervalId = setTimeout(() => {
      nextSlide();
      setTimeout(intervalId, 5000);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [currentSlide, nextSlide]);
  //

  //Start for swipable on touchscreens
  const [startX, setStartX] = useState(null);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    if (startX && currentX < startX) {
      nextSlide();
    }
    if (startX && currentX > startX) {
      prevSlide();
    }
    setStartX(null);
  };
  //

  return (
    <div
      className="slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div
        className="container"
        style={{
          transform: `translateX(-${currentSlide * 100}vw)`,
          width: `${slider.length * 100}vw`,
        }}
      >
        {slider.map((slider) => (
          <div className="slider-content">
            <h1>{slider.title}</h1>
            <picture>
              <source media="(min-width: 900px)" srcset={slider.img} />
              <source media="(min-width: 480px)" srcset={slider.imgSm} />
              <img src={slider.imgSm} alt="banner" />
            </picture>
          </div>
        ))}
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <WestOutlinedIcon />
        </div>
        <div className="icon" onClick={nextSlide}>
          <EastOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Slider;
