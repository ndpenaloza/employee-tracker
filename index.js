const mysql = require("mysql");
const inquirer = require("inquirer");
const password = require("password");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: password,
    database: "employee-data"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});