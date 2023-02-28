const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const connection = require("../config/db");

// Get all products
router.get("/api/v1/products", (req, res) => {
  const sqlQuery = "SELECT * FROM Products";
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.log("Received error:");
      console.log(Object.entries(err));
      res.status(400).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

// Get a specific product by ID
router.get("/api/v1/products/:id", (req, res) => {
  const productId = req.params.id;
  const sqlQuery = "SELECT * FROM Products WHERE ProductID = ?";
  connection.query(sqlQuery, [productId], (err, results) => {
    if (err) {
      console.log("Received error:");
      console.log(Object.entries(err));
      res.status(400).send(err);
    } else {
      if (results.length) {
        res.status(200).send(results[0]);
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    }
  });
});

// Create a new product
router.post("/api/v1/products", (req, res) => {
  const product = req.body;
  const sqlQuery = "INSERT INTO Products SET ?";
  connection.query(sqlQuery, [product], (err, result) => {
    if (err) {
      console.log("Received error:");
      console.log(Object.entries(err));
      res.status(400).send(err);
    } else {
      const newProductId = result.insertId;
      res.status(201).send({ message: "Product created", id: newProductId });
    }
  });
});

// Update an existing product by ID
router.put("/api/v1/products/:id", (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  const sqlQuery = "UPDATE Products SET ? WHERE ProductID = ?";
  connection.query(sqlQuery, [updatedProduct, productId], (err, result) => {
    if (err) {
      console.log("Received error:");
      console.log(Object.entries(err));
      res.status(400).send(err);
    } else {
      if (result.affectedRows) {
        res.status(200).send({ message: "Product updated" });
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    }
  });
});

// Delete a product by ID
router.delete("/api/v1/products/:id", (req, res) => {
  const productId = req.params.id;
  const sqlQuery = "DELETE FROM Products WHERE ProductID = ?";
  connection.query(sqlQuery, [productId], (err, result) => {
    if (err) {
      console.log("Received error:");
      console.log(Object.entries(err));
      res.status(400).send(err);
    } else {
      if (result.affectedRows) {
        res.status(200).send({ message: "Product deleted" });
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    }
  });
});

module.exports = router;