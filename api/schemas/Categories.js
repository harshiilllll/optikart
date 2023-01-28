const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    cat: { type: String, required: true },
    bgImg: { type: String },
    desc: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories", CategoriesSchema);
