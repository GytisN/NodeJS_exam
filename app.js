
const express = require("express");
const connection = require("./config/db.js");
const mysql = require("mysql");
const { error } = require("console");
const app = express();
const port = process.env.PORT || 3000;


const employeesRouter = require("./routes/employees");
const OrderDetailsRouter = require("./routes/OrderDetails");
const OrdersRouter = require("./routes/Orders");
const productsRouter = require("./routes/products");
const shippersRouter = require("./routes/shippers");



app.use(express.json());
app.use(employeesRouter);
app.use(OrderDetailsRouter);
app.use(OrdersRouter);
app.use(productsRouter);
app.use(shippersRouter);



app.listen(port, () => {
    console.log('Server is listening:', port);
});

