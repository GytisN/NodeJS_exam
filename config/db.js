const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "VolvoS40",
    database: "node_exam"
});

connection.connect((err) => {
    if (err) {
        throw err
    }
    console.log("Connected to MySQL Server!")
});

module.exports = connection;