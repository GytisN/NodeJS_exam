CREATE TABLE Employees (
    EmployeeID INT NOT NULL  AUTO_INCREMENT,
    LastName VARCHAR(255),
    FirstName VARCHAR(255),
    Title VARCHAR(255),
    TitleOfCourtesy VARCHAR(255),
    BirthDate DATE,
    HireDate DATE,
    Adress VARCHAR(255),
    PRIMARY KEY (EmployeeID)
);