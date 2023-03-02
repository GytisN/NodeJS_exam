CREATE TABLE Orders(
    OrderID INT NOT NULL  AUTO_INCREMENT,
    ShipperID INT,
    CustomerID INT,
    OrderDate DATE,
    PRIMARY KEY (OrderID),
    CONSTRAINT fk_Orders_TO_Shippers FOREIGN KEY (ShipperID) REFERENCES Shippers(ShipperID),
    CONSTRAINT fk_Orders_TO_Customers FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)

);