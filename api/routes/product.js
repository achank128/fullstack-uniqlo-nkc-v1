const router = require("express").Router();

const {
  authenticate,
  authenticateUser,
  authenticateAdmin,
} = require("../middleware/authentication");

const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} = require("../controllers/productController");
router.get("/all", getAllProducts);
router.route("/").get(getProducts).post(authenticateAdmin, createProduct);
router
  .route("/:id")
  .get(getProduct)
  .put(authenticateAdmin, updateProduct)
  .delete(authenticateAdmin, deleteProduct);

module.exports = router;
