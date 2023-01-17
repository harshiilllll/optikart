const express = require("express");

const app = express();
const PORT = 8000 || process.env.PORT;

const authRoute = require("./routes/auth");

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
