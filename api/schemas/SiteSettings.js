const mongoose = require("mongoose");

const SiteSettingsSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  brandTagline: { type: String },
  brandEmail: { type: String, required: true },
  brandNumber: { type: String },
  about: { type: String },
  address: { type: String },
});

module.exports = mongoose.model("SiteSettings", SiteSettingsSchema);
