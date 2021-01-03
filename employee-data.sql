DROP DATABASE IF EXISTS employeedb;

CREATE DATABASE employeedb;

USE employeedb;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id)
);

INSERT INTO department (name)
VALUES ("PEDIATRICS");

INSERT INTO employee (first_name,last_name, role_id, manager_id)
VALUES ("Nick", "Penaloza", 8, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Research Assistant", 100000, 2);

SELECT * FROM department;
