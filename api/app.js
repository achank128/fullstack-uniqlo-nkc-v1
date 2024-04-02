const express = require("express");
const app = express();

require("dotenv").config();
require("express-async-errors");
const mongoose = require("mongoose");
var cors = require("cors");

//routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");

//middleware
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("UNIQLO SHOP API");
});
//routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

//Not found
app.use((req, res) => res.status(404).send("Route does not exist"));
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}..!`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
