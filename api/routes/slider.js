const router = require("express").Router();
const Slider = require("../schemas/Slider");
const { verify } = require("../verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  const newSlider = new Slider(req.body);
  try {
    const savedSlider = await newSlider.save();
    res.status(201).json(savedSlider);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verify, async (req, res) => {
  try {
    const slider = await Slider.find();
    res.status(201).json(slider);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
