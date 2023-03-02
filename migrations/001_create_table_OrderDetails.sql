CREATE TABLE OrderDetails(
    OrderID INT NOT NULL AUTO_INCREMENT,
    ProductID INT,
    UnitPrice DECIMAL(10,2),
    Quantity INT,
    Discount DECIMAL(4,2),
    PRIMARY KEY (OrderID, ProductID),
    CONSTRAINT fk_OrderDetails_TO_Orders FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    CONSTRAINT fk_OrderDetails_TO_Products FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);