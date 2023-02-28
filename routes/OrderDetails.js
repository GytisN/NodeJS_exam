const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const connection = require("../config/db");


// GET all order details
router.get('/', (req, res) => {
  db.query('SELECT * FROM OrderDetails', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching order details');
    } else {
      res.json(result);
    }
  });
});

// GET order details for a specific order
router.get('/:orderId', (req, res) => {
  const { orderId } = req.params;
  db.query('SELECT * FROM OrderDetails WHERE OrderID = ?', [orderId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error fetching order details for order ${orderId}`);
    } else {
      res.json(result);
    }
  });
});

// POST new order details
router.post('/', (req, res) => {
  const { OrderID, ProductID, UnitPrice, Quantity, Discount } = req.body;
  db.query('INSERT INTO OrderDetails (OrderID, ProductID, UnitPrice, Quantity, Discount) VALUES (?, ?, ?, ?, ?)', [OrderID, ProductID, UnitPrice, Quantity, Discount], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating new order details');
    } else {
      res.status(201).send('New order details created');
    }
  });
});

// PUT update order details for a specific order and product
router.put('/:orderId/:productId', (req, res) => {
  const { orderId, productId } = req.params;
  const { UnitPrice, Quantity, Discount } = req.body;
  db.query('UPDATE OrderDetails SET UnitPrice = ?, Quantity = ?, Discount = ? WHERE OrderID = ? AND ProductID = ?', [UnitPrice, Quantity, Discount, orderId, productId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error updating order details for order ${orderId} and product ${productId}`);
    } else {
      res.status(200).send(`Order details for order ${orderId} and product ${productId} updated`);
    }
  });
});

// DELETE order details for a specific order and product
router.delete('/:orderId/:productId', (req, res) => {
  const { orderId, productId } = req.params;
  db.query('DELETE FROM OrderDetails WHERE OrderID = ? AND ProductID = ?', [orderId, productId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error deleting order details for order ${orderId} and product ${productId}`);
    } else {
      res.status(200).send(`Order details for order ${orderId} and product ${productId} deleted`);
    }
  });
});

module.exports = router;