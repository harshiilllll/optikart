const router = require("express").Router();
const Slider = require("../schemas/Slider");
const { verify, verifyTokenAndAdmin } = require("../verifyToken");

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
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
    res.status(200).json(slider);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Slider.findByIdAndDelete(req.params.id);
    res.status(200).json("Slider deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
