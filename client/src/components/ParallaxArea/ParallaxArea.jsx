import React from "react";
import { Parallax } from "react-parallax";
import "./ParallaxArea.scss";

const ParallaxArea = ({ direction, bgImg, title, content }) => {
  return (
    <div className="parallaxArea" style={{ flexDirection: direction }}>
      <Parallax className="parallax" bgImage={bgImg} strength={200} />
      <div className="parallaxContent">
        <h1>{title}</h1>
        <p>{content}</p>
        <button>Browse Products</button>
      </div>
    </div>
  );
};

export default ParallaxArea;
