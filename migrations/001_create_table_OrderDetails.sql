create table OrderDetails(
primary key (OrderID),
primary key (ProductID),
OrderID INT,
ProductID INT,
UnitPrice INT,
Quantity INT,
Discount INT,
FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
);