const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Get all order details
router.get('/api/v1/OrderDetails', (req, res) => {
  const sql = 'SELECT * FROM OrderDetails';

  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
      return;
    }

    res.json(results);
  });
});

// Get order detail by order ID
router.get('/api/v1/OrderDetails/:orderID', (req, res) => {
  const orderID = req.params.orderID;
  const sql = 'SELECT * FROM OrderDetails WHERE OrderID = ?';

  connection.query(sql, [orderID], (error, results, fields) => {
    if (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Order detail not found');
      return;
    }

    res.json(results[0]);
  });
});

// Add new order detail
router.post('/api/v1/OrderDetails', (req, res) => {
  const { OrderID, ProductID, UnitPrice, Quantity, Discount } = req.body;
  const sql = 'INSERT INTO OrderDetails (OrderID, ProductID, UnitPrice, Quantity, Discount) VALUES (?, ?, ?, ?, ?)';

  connection.query(sql, [OrderID, ProductID, UnitPrice, Quantity, Discount], (error, results, fields) => {
    if (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
      return;
    }

    res.json({ message: 'Order detail added successfully' });
  });
});

// Update existing order detail
router.put('/api/v1/OrderDetails/:productID', (req, res) => {
  const orderID = req.params.orderID;
  const productID = req.params.productID;
  const { UnitPrice, Quantity, Discount } = req.body;
  const sql = 'UPDATE OrderDetails SET UnitPrice = ?, Quantity = ?, Discount = ? WHERE OrderID = ? AND ProductID = ?';

  connection.query(sql, [UnitPrice, Quantity, Discount, orderID, productID], (error, results, fields) => {
    if (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send('Order detail not found');
      return;
    }

    res.json({ message: 'Order detail updated successfully' });
  });
});

// Delete order detail
router.delete('/api/v1/OrderDetails/:productID', (req, res) => {
  const orderID = req.params.orderID;
  const productID = req.params.productID;
  const sql = 'DELETE FROM OrderDetails WHERE OrderID = ? AND ProductID = ?';

  connection.query(sql, [orderID, productID], (error, results, fields) => {
    if (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send('Order detail not found');
      return;
    }

    res.json({ message: 'Order detail deleted successfully' });
  });
});

module.exports = router;
