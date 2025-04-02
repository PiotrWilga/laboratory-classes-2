const express = require("express");
const path = require("path");
const renderNewProductPage = require("../views/renderNewProductPage");

const router = express.Router();

router.get("/add", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "add-product.html"));
});

router.get("/new", (req, res) => {
    renderNewProductPage(res);
});

module.exports = router;
