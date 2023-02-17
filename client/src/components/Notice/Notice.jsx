import { Close } from "@mui/icons-material";
import React, { useState } from "react";
import "./Notice.scss";

const Notice = () => {
  const [display, setDisplay] = useState("flex");
  return (
    <div style={{ display: display }} className="notice">
      Sunglasses & Eyeglasses - Free shipping - 30 days try on
      <Close className="closeIcon" onClick={() => setDisplay("none")} />
    </div>
  );
};

export default Notice;
