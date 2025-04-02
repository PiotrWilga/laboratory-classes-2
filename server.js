const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const config = require("./config");
const { getInfoLog, getErrorLog } = require("./utils/logger");
const { STATUS_CODE } = require("./constants/statusCode");
// const productRoutes = require("./routing/product");
// const logoutRoutes = require("./routing/logout");
const killRoutes = require("./routing/kill");
const homeRoutes = require("./routing/home");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  getInfoLog(req.method, req.url);
  next();
});

// app.use("/product", productRoutes);
// app.use("/logout", logoutRoutes);
app.use("/kill", killRoutes);
app.use(homeRoutes);

app.use((req, res) => {
  getErrorLog(req.url);
  res.status(STATUS_CODE.NOT_FOUND).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
