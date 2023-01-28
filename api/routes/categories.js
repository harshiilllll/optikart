const Categories = require("../schemas/Categories");
const { verifyTokenAndAdmin, verify } = require("../verifyToken");
const router = require("express").Router();

//Create Category
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const category = new Categories(req.body);
  try {
    const savedCategory = await category.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get category
router.get("/", verify, async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GEt all
router.get("/", verify, async (req, res) => {
  try {
    const category = Categories.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Categories.findByIdAndDelete(req.params.id);
    res.status(200).json("Category Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
