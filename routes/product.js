const express = require("express");
const router = express.Router();
const {
  getProducts,
  updateProduct,
  DeleteProduct,
  createProduct,
} = require("../controllers/product");

router.route("/product").get(getProducts);
router.route("/product").post(createProduct);
router.route("/product").put(updateProduct);
router.route("/product").delete(DeleteProduct);
module.exports = router;
