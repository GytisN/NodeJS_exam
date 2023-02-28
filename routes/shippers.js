const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const connection = require("../config/db");

// GET all shippers
router.get('/', async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let shippers = await pool.request().query('SELECT * from Shippers');
    res.json(shippers.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET a specific shipper by ID
router.get('/:id', async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let shipper = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('SELECT * from Shippers WHERE ShipperID = @id');

    if (shipper.recordset.length === 0) {
      res.status(404).send('Shipper not found');
    } else {
      res.json(shipper.recordset[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST a new shipper
router.post('/', async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input('CompanyName', sql.VarChar(255), req.body.CompanyName)
      .input('Phone', sql.VarChar(16), req.body.Phone)
      .query('INSERT INTO Shippers (CompanyName, Phone) VALUES (@CompanyName, @Phone)');

    res.status(201).send('Shipper added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// PUT (update) an existing shipper by ID
router.put('/:id', async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .input('CompanyName', sql.VarChar(255), req.body.CompanyName)
      .input('Phone', sql.VarChar(16), req.body.Phone)
      .query('UPDATE Shippers SET CompanyName = @CompanyName, Phone = @Phone WHERE ShipperID = @id');

    if (result.rowsAffected[0] === 0) {
      res.status(404).send('Shipper not found');
    } else {
      res.send('Shipper updated');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE a shipper by ID
router.delete('/:id', async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('DELETE FROM Shippers WHERE ShipperID = @id');

    if (result.rowsAffected[0] === 0) {
      res.status(404).send('Shipper not found');
    } else {
      res.send('Shipper deleted');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;