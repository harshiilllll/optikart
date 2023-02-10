import React from "react";
import './Loader.scss'

const Loader = () => {
  return (
    <div className="loader">
      <svg class="circular">
        <circle
          class="path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke-width="3"
          stroke-miterlimit="10"
        />
      </svg>
    </div>
  );
};

export default Loader;
