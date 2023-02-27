create table Orders(
primary key (orderID),
OrderID INT,
ShipperID INT,
CustomerID INT,
EmployeeID INT,
OrderDate DATE,
FOREIGN KEY (OrderID) REFERENCES Shippers(ShipperID),
FOREIGN KEY (ShipperID) REFERENCES Employees(EmployeeID)
);