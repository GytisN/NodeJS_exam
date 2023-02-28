CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    ShipperID INT,
    CustomerID INT,
    OrderDate DATE,
    FOREIGN KEY (ShipperID) REFERENCES Shippers(ShipperID),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);