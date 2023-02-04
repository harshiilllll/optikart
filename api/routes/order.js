const router = require("express").Router();
const Order = require("../schemas/Order");
const {
  verify,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../verifyToken");

//CREATE Order
router.post("/", verify, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Order
router.put("/:userId", async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { userId: req.params.userId },
      {
        $set: req.body,
      },
      { sort: { createdAt: -1 }, new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Order
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("The Order has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER ORDERS
router.get("/find/:userId", verify, async (req, res) => {
  try {
    const orders = await Order.findOne({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(1);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ORDER
router.get("/:id", verify, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET MONTHLY INCOME STATS
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

//SEARCH Order
router.get("/search", verify, async (req, res) => {
  const query = req.query.q;
  try {
    const order = await Order.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { categories: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
