import React, { useCallback, useEffect, useState } from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import "./slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    "https://cdn.discordapp.com/attachments/1064859758068248588/1064861021002547220/harshiilllll_cool_glasses_blue_white_background_product_photosh_558ed372-2f0c-4127-9dec-26070ff6861b.png",
    "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];

  const prevSlide = useCallback(() => {
    setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev - 1);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
  }, [currentSlide]);

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
          width: `${data.length * 100}vw`,
        }}
      >
        <img src={data[0]} alt="" />
        <img src={data[1]} alt="" />
        <img src={data[2]} alt="" />
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
