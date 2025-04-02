const path = require("path");
const fs = require("fs");
const { STATUS_CODE } = require("../constants/statusCode");
const express = require("express");
const router = express.Router();

const FILE_PATH = path.join(__dirname, "../products.json");

// Middleware do obsługi danych z formularza
router.use(express.urlencoded({ extended: true }));

// Obsługa GET /product/add - zwraca stronę formularza
router.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "add-product.html"));
});

// Obsługa POST /product/add - zapisuje produkt i przekierowuje
router.post("/add", (req, res) => {
  const newProduct = {
    name: req.body.productName || "Unknown",
    price: req.body.productPrice || "0.00",
  };

  // Odczyt pliku JSON, jeśli nie istnieje, tworzymy nową tablicę
  fs.readFile(FILE_PATH, "utf-8", (err, data) => {
    let products = [];
    
    if (!err) {
      try {
        products = JSON.parse(data);
      } catch (parseErr) {
        console.error("Błąd parsowania JSON:", parseErr);
      }
    }

    products.push(newProduct);

    // Zapis nowej wersji pliku
    fs.writeFile(FILE_PATH, JSON.stringify(products, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Błąd zapisu JSON:", writeErr);
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send("Błąd zapisu danych.");
      }

      res.redirect("/product/new"); // Przekierowanie do nowego produktu
    });
  });
});

// Obsługa GET /product/new - odczyt i wyświetlenie najnowszego produktu
router.get("/new", (req, res) => {
  fs.readFile(FILE_PATH, "utf-8", (err, data) => {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Shop - Newest product</title></head>");
    res.write("<body>");
    res.write("<h1>Newest product</h1>");
    res.write(
      "<nav><a href='/'>Home</a><br /><a href='/product/add'>Add product</a><br /><a href='/logout'>Logout</a></nav>"
    );

    if (err || !data) {
      res.write("<br /><div>No new products available.</div>");
    } else {
      let products = [];
      try {
        products = JSON.parse(data);
      } catch (parseErr) {
        console.error("Błąd parsowania JSON:", parseErr);
      }

      if (products.length > 0) {
        const newestProduct = products[products.length - 1];
        res.write(`<br /><div>New product: ${newestProduct.name} - Price: ${newestProduct.price} zł</div>`);
      } else {
        res.write("<br /><div>No new products available.</div>");
      }
    }

    res.write("</body>");
    res.write("</html>");
    res.end();
  });
});

module.exports = router;
