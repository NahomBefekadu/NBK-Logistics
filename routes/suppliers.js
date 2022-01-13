const express = require("express");
const router = express.Router();
const { getSuppliers } = require("../controllers/supplier");

router.route("/supplier").get(getSuppliers);
module.exports = router;
