const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = require('../config/db');

// Get all shippers
router.get('/api/v1/shippers', (req, res) => {
  const sql = 'SELECT * FROM Shippers';
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Get a single shipper
router.get('/api/v1/shippers/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM Shippers WHERE ShipperID = ${mysql.escape(id)}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.json(result[0]);
  });
});

// Create a shipper
router.post('/api/v1/shippers', (req, res) => {
  const { CompanyName, Phone } = req.body;
  const sql = `INSERT INTO Shippers (CompanyName, Phone) VALUES (${mysql.escape(CompanyName)}, ${mysql.escape(Phone)})`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    const newShipper = { ShipperID: result.insertId, CompanyName, Phone };
    res.json(newShipper);
  });
});

// Update a shipper
router.put('/api/v1/shippers/:id', (req, res) => {
  const { id } = req.params;
  const { CompanyName, Phone } = req.body;
  const sql = `UPDATE Shippers SET CompanyName = ${mysql.escape(CompanyName)}, Phone = ${mysql.escape(Phone)} WHERE ShipperID = ${mysql.escape(id)}`;
  connection.query(sql, error => {
    if (error) throw error;
    const updatedShipper = { ShipperID: Number(id), CompanyName, Phone };
    res.json(updatedShipper);
  });
});

// Delete a shipper
router.delete('/api/v1/shippers/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM Shippers WHERE ShipperID = ${mysql.escape(id)}`;
  connection.query(sql, error => {
    if (error) throw error;
    res.json({ message: `Shipper with ID ${id} has been deleted.` });
  });
});

module.exports = router;