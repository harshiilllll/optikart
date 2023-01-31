const router = require("express").Router();
const List = require("../schemas/List");
const { verify, verifyTokenAndAdmin } = require("../verifyToken");

//CREATE LIST
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const list = new List(req.body);
  try {
    const savedList = await list.save();
    res.status(200).json(savedList);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET LISTS
router.get("/", async (req, res) => {
  try {
    const lists = await List.find();
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE LIST
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedList = await List.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete list
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.status(200).json("LIST DELETED");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
