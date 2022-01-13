const db = require("../db");
const { StatusCodes } = require("http-status-codes");
//get Section
const getWarehouse = async (req, res) => {
  const statement = `SELECT * FROM warehouse;`;
  const values = [];
  const results = await db.query(statement, values);
  if (!results) {
    throw new CustomError.NotFoundError(`No categories found`);
  }
  res.status(StatusCodes.OK).json({
    msg: "Query completed retrieved categories successfully",
    Products: results.rows,
  });
};
const createWarehouse = async (req, res) => {
  const statement = `INSERT INTO warehouse (warehouse_name)
  VALUES
    ($1);`;
  const values = [req.body.warehouse_name];
  const results = await db.query(statement, values);
  res.status(StatusCodes.CREATED).json({
    msg: "Query completed created product successfully",
    Products: results.rows,
  });
};
module.exports = {
  getWarehouse,
  createWarehouse,
};
