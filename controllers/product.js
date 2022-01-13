const db = require("../db");
const { StatusCodes } = require("http-status-codes");

//get Section
const getProducts = async (req, res) => {
  const statement = `SELECT product_id,product_name,description,sku,price,category_name,stock,warehouse_name,supplier_name
  FROM product
  join category ON (category=category_id)
  join warehouse ON (location = warehouse_id)
  join supplier ON (supplier =supplier_id);`;
  const values = [];
  const results = await db.query(statement, values);
  if (!results) {
    throw new CustomError.NotFoundError(`No products found`);
  }
  res.status(StatusCodes.OK).json({
    msg: "Query completed retrieved products successfully",
    Products: results.rows,
  });
};
const getProduct = async (req, res) => {
  const statement = `SELECT product_id,product_name,description,sku,price,category_name,stock,warehouse_name,supplier_name
    FROM product
    join category ON (category=category_id)
    join warehouse ON (location = warehouse_id)
    join supplier ON (supplier =supplier_id)
    where product_id = $1;`;
  const values = [req.params.id];
  const results = await db.query(statement, values);
  if (!results) {
    throw new CustomError.NotFoundError(`No products found`);
  }
  res.status(StatusCodes.OK).json({
    msg: "Query completed retrieved products successfully",
    Products: results.rows,
  });
};

/*
 const statement = `INSERT INTO product (product_name,description,sku,price,category,stock,location,supplier)
  VALUES
  (?,?,?,?,?,?,?,?);`;
  const values = [
    req.body.name,
    req.body.description,
    req.body.sku,
    parseFloat(req.body.price),
    parseInt(req.body.category),
    parseInt(req.body.stock),
    parseInt(req.body.location),
    parseInt(req.body.supplier),
  ];
*/

//Insert Section
const createProduct = async (req, res) => {
  const statement = `INSERT INTO product (product_name,description,sku,price,category,stock,location,supplier)
  VALUES
  ($1,$2,$3,$4,$5,$6,$7,$8);`;
  const values = [
    req.body.name,
    req.body.description,
    req.body.sku,
    parseFloat(req.body.price),
    parseInt(req.body.category),
    parseInt(req.body.stock),
    parseInt(req.body.location),
    parseInt(req.body.supplier),
  ];
  //console.log(query(statement, values));

  const results = await db.query(statement, values);
  //.log(results.rows[0]);

  res.status(StatusCodes.CREATED).json({
    msg: "Query completed created product successfully",
    request: values,
  });
};
//Delete Section
const DeleteProduct = async (req, res) => {
  console.log("hel");
  const statement = `DELETE FROM product WHERE product_id = $1;`;
  const values = [req.query.product_id];
  console.log(values);
  const results = await db.query(statement, values);
  if (!results) {
    throw new CustomError.NotFoundError(`Could not find selected product`);
  }
  res.status(StatusCodes.OK).json({
    msg: "Query completed Deleted product successfully",
  });
};

// Patch Section
const updateProduct = async (req, res) => {
  const statement = `UPDATE product SET product_name= $1,description= $2,sku= $3,price= $4,category= $5,stock= $6,location= $7,supplier= $8 where product_id = $9`;
  const values = [
    req.body.name2,
    req.body.description2,
    req.body.sku2,
    parseFloat(req.body.price2),
    parseInt(req.body.category2),
    parseInt(req.body.stock2),
    parseInt(req.body.location2),
    parseInt(req.body.supplier2),
    req.query.product_id,
  ];
  const results = await db.query(statement, values);
  if (!results) {
    throw new CustomError.NotFoundError(`Could not find selected product`);
  }
  res.status(StatusCodes.OK).json({
    msg: "Query completed updated product successfully",
  });
};
module.exports = {
  getProducts,
  getProduct,
  updateProduct,
  DeleteProduct,
  createProduct,
};
