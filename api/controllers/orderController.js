const Order = require("../models/Order");
const Product = require("../models/Product");
const CustomError = require("../errors");

const createOrder = async (req, res) => {
  const { subtotal, shippingFee, total, products } = req.body;
  if (!subtotal || !shippingFee || !total)
    throw new CustomError.BadRequestError(
      "Please provide subtotal, shipping fee, total."
    );

  if (!products || products.length < 1)
    throw new CustomError.BadRequestError("No product provided.");

  for (const product of products) {
    const dbProduct = await Product.findById(product.productId);
    if (!dbProduct)
      throw new CustomError.NotFoundError(
        `No product with id : ${product.productId}`
      );
  }
  const order = await Order.create({ ...req.body, userId: req.user.userId });
  res.status(201).json({ order });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.status(200).json({ orders, count: orders.length });
};

const getOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findById(orderId);
  if (!order)
    throw new CustomError.NotFoundError(`No product with id : ${order}`);
  res.status(200).json({ order });
};

const getUserOrders = async (req, res) => {
  const userOrders = await Order.find({ userId: req.params.id });
  res.status(200).json({ userOrders, count: userOrders.length });
};

const getUserPurchase = async (req, res) => {
  const userPurchase = await Order.find({
    userId: req.params.id,
    status: "delivered",
  });
  res.status(200).json({ userPurchase, count: userPurchase.length });
};

const updateStatusOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { status } = req.body;

  const orderUpdate = await Order.findOne({ _id: orderId });
  if (!orderUpdate)
    throw new CustomError.NotFoundError(`No product with id : ${orderUpdate}`);

  orderUpdate.status = status;
  await orderUpdate.save();

  res
    .status(200)
    .json({ msg: `Order status has been updated to: ${orderUpdate.status}` });
};

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  getUserPurchase,
  getOrder,
  updateStatusOrder,
};
