const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const connection = require("../config/db");

// GET all employees
router.get('/api/v1/employees', (req, res) => {
  const sql = 'SELECT * FROM Employees';
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// GET employee by ID
router.get('/api/v1/employees:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM Employees WHERE EmployeeID = ${id}`;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results[0]);
  });
});

// POST new employee
router.post('/api/v1/employees', (req, res) => {
  const { LastName, FirstName, Title, TitleOfCourtesy, BirthDate, HireDate, Adress } = req.body;
  const sql = `INSERT INTO Employees (LastName, FirstName, Title, TitleOfCourtesy, BirthDate, HireDate, Adress) VALUES ('${LastName}', '${FirstName}', '${Title}', '${TitleOfCourtesy}', '${BirthDate}', '${HireDate}', '${Adress}')`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.status(201).send(`Employee added with ID: ${result.insertId}`);
  });
});

// PUT update employee by ID
router.put('/api/v1/employees:id', (req, res) => {
  const { id } = req.params;
  const { LastName, FirstName, Title, TitleOfCourtesy, BirthDate, HireDate, Adress } = req.body;
  const sql = `UPDATE Employees SET LastName = '${LastName}', FirstName = '${FirstName}', Title = '${Title}', TitleOfCourtesy = '${TitleOfCourtesy}', BirthDate = '${BirthDate}', HireDate = '${HireDate}', Adress = '${Adress}' WHERE EmployeeID = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.send(`Employee with ID: ${id} updated`);
  });
});

// DELETE employee by ID
router.delete('/api/v1/employees:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM Employees WHERE EmployeeID = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.send(`Employee with ID: ${id} deleted`);
  });
});

module.exports = router;