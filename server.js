const express = require("express");
const connection = require("./config/db");
const mysql = require("mysql");
const { error } = require("console");
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.listen(port, () => {
    console.log('Server is listening:', port);
});