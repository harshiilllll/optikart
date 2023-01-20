const router = require("express").Router();
const Cart = require("../schemas/Cart");
const {
  verify,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../verifyToken");

//CREATE CART
router.post("/", verify, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE CART
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE CART
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("The Cart has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts)
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET Cart STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Cart.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

//SEARCH Cart
router.get("/search", verify, async (req, res) => {
  const query = req.query.q;
  try {
    const cart = await Cart.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { categories: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
