const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000 || process.env.PORT;

const authRoute = require("./routes/auth");
const productRoute = require("./routes/products");
const userRoute = require("./routes/users");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const sliderRoute = require("./routes/slider");
const listsRoute = require("./routes/lists");
const stripeRoute = require("./routes/stripe");

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartRoute);
app.use("/api/slider", sliderRoute);
app.use("/api/lists", listsRoute);
app.use("/api/checkout", stripeRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
