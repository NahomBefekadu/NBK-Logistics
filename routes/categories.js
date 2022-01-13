const express = require("express");
const router = express.Router();
const { getCategories } = require("../controllers/category");

router.route("/category").get(getCategories);
module.exports = router;
