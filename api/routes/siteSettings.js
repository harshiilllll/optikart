const router = require("express").Router();
const SiteSettings = require("../schemas/SiteSettings");
const { verify, verifyTokenAndAdmin } = require("../verifyToken");

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const settings = new SiteSettings(req.body);
  try {
    const savedSettings = await settings.save();
    res.status(201).json(savedSettings);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verify, async (req, res) => {
  try {
    const settings = await SiteSettings.find();
    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
