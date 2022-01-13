const express = require("express");
const router = express.Router();
const { getWarehouse, createWarehouse } = require("../controllers/warehouse");

router.route("/warehouse").get(getWarehouse);
router.route("/warehouse").post(createWarehouse);
module.exports = router;
