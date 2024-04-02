const Product = require("../models/Product");
const CustomError = require("../errors");

const getProducts = async (req, res) => {
  const queryObject = {};
  const { search, category, sort } = req.query;
  const pageSize = req.query.pageSize || 12;
  const page = req.query.page || 1;
  const skip = (page - 1) * pageSize;

  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }
  if (category) {
    if (category !== "ALL") queryObject.for = category;
  }

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  result = result.skip(skip).limit(pageSize);
  const allProduct = await Product.find(queryObject);
  const products = await result;

  res.status(200).json({ products, count: allProduct.length });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

const getProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findById(productId);
  if (!product)
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  res.status(200).json({ product });
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const productUpdate = await Product.findOneAndUpdate(
    { _id: productId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!productUpdate)
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  res.status(200).json({ productUpdate });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const productDelete = await Product.findOneAndDelete({ _id: productId });
  if (!productDelete)
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  res.status(200).json({
    msg: `Success! Product with id:${productDelete._id} has been removed.`,
  });
};

module.exports = {
  getAllProducts,
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
