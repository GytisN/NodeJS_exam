const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const connection = require("../config/db");

// GET all orders
router.get('/api/v1/orders', (req, res) => {
  connection.query('SELECT * FROM Orders', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// GET an order by ID
router.get('/api/v1/orders:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM Orders WHERE OrderID = ?', [id], (error, results) => {
    if (error) throw error;
    res.send(results[0]);
  });
});

// CREATE a new order
router.post('/api/v1/orders', (req, res) => {
  const { ShipperID, CustomerID, OrderDate } = req.body;
  connection.query('INSERT INTO Orders SET ?', { ShipperID, CustomerID, OrderDate }, (error, results) => {
    if (error) throw error;
    res.send(`Order with ID ${results.insertId} added.`);
  });
});

// UPDATE an order
router.put('/api/v1/orders:id', (req, res) => {
  const { ShipperID, CustomerID, OrderDate } = req.body;
  const { id } = req.params;
  connection.query('UPDATE Orders SET ShipperID = ?, CustomerID = ?, OrderDate = ? WHERE OrderID = ?', [ShipperID, CustomerID, OrderDate, id], (error, results) => {
    if (error) throw error;
    res.send(`Order with ID ${id} updated.`);
  });
});

// DELETE an order
router.delete('/api/v1/orders:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM Orders WHERE OrderID = ?', [id], (error, results) => {
    if (error) throw error;
    res.send(`Order with ID ${id} deleted.`);
  });
});

module.exports = router;