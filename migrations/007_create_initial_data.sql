INSERT INTO Shippers (ShipperID, CompanyName, Phone)
VALUES (1, 'AG', '112');

INSERT INTO Employees (EmployeeID, LastName, FirstName, Title, TitleOfCourtesy, BirthDate, HireDate, Address, City)
VALUES (1, 'Smith', 'John', 'Manager', 'Mr.', '1990-01-01', '2022-02-28', '123 Main Street', 'New York');

INSERT INTO Orders (OrderID, CustomerID, EmployeeID, OrderDate)
VALUES (1, 1, 1, '2023-02-28');

INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice)
VALUES (1, 'Product', 1, 1, 1, 10);

INSERT INTO Order_Details (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES (1, 1, 10.00, 1, 10);