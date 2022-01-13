const db = require("../db");
const { StatusCodes } = require("http-status-codes");
//get Section
const getCategories = async (req, res) => {
  const statement = `SELECT * FROM category;`;
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
module.exports = {
  getCategories,
};
