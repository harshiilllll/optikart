const router = require("express").Router();
const List = require("../schemas/List");
const { verify } = require("../verifyToken");

//CREATE LIST
router.post("/", verify, async (req, res) => {
  const list = new List(req.body);
  try {
    const savedList = await list.save();
    res.status(200).json(savedList);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET LISTS
router.get("/", verify, async (req, res) => {
  try {
    const lists = await List.find();
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
