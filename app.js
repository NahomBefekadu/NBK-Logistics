// Express Server Setup
const express = require("express");
const app = express();

//package installs
require("dotenv").config();
require("express-async-errors");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

// render static front end
app.use(express.static("./public"));
app.use(express.json());

//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
//routers
const productRouter = require("./routes/product");
const warehouseRouter = require("./routes/warehouse");
const categoryRouter = require("./routes/categories");
const supplyRouter = require("./routes/suppliers");

//routes
app.use("/api/v1", productRouter);
app.use("/api/v1", warehouseRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", supplyRouter);

// use packages
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
// use middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Server start
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
