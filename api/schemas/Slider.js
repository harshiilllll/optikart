const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String },
    img: { type: String },
    imgSm: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slider", SliderSchema);
