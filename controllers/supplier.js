const db = require("../db");
const { StatusCodes } = require("http-status-codes");
//get Section
const getSuppliers = async (req, res) => {
  const statement = `SELECT * FROM supplier;`;
  const values = [];
  const results = await db.query(statement, values);
  if (!results) {
    throw new CustomError.NotFoundError(`No suppliers found`);
  }
  res.status(StatusCodes.OK).json({
    msg: "Query completed retrieved suppliers successfully",
    Products: results.rows,
  });
};
module.exports = {
  getSuppliers,
};
