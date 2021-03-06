// Dependencies 
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

var password = require("./password.js");

// MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: password.usePassword(),
    database: "employeedb"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id: " + connection.threadId);
    employeeQuest();
});

// Function asks user what would like to be done
employeeQuest = () => {
    inquirer.prompt({
        name: "initialOptions",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View all departments",
            "View all roles",
            "View employees by manager",
            "Add new employee",
            "Add new department",
            "Add new role",
            "Update employee role",
            "Update employee manager",
            "Delete employee",
            "Delete department",
            "Delete role",
            "Cancel"
        ]
    }).then(response => {
        switch (response.initialOptions) {
            case "View all employees":
                viewEmployees();
                break;
            case "View all departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View employees by manager":
                viewEmployeesPerManager();
                break;
            case "Add new employee":
                addEmployee();
                break;
            case "Add new department":
                addDepartment();
                break;
            case "Add new role":
                addRole();
                break;
            case "Update employee role":
                updateEmployeeRole();
                break;
            case "Update employee manager":
                updateEmployeesManager();
                break;
            case "Delete employee":
                deleteEmployee();
                break;
            case "Delete department":
                deleteDepartment();
                break;
            case "Delete role":
                deleteRole();
                break;
            default:
                connection.end();
                break;
        }
    })
};

// Function to view all employees
viewEmployees = () => {
    connection.query("SELECT * FROM employee", (err, data) => {
        console.table(data);
        console.log("===================================");
        employeeQuest();
    });
};

//Function to view all departments
viewDepartments = () => {
    connection.query("SELECT * FROM department", (err, data) => {
        console.table(data);
        console.log("===================================");
        employeeQuest();
    });
};

// Function views all roles
viewRoles = () => {
    connection.query("SELECT * FROM role", (err, data) => {
        console.table(data);
        console.log("===================================");
        employeeQuest();
    })
}

//Function views employees by manager
viewEmployeesPerManager = () => {
    inquirer.prompt([
        {
            name: "managerID",
            type: "number",
            message: "Enter Manager ID to view all employees supervised by manager:"
        }
    ]).then((response) => {
        connection.query("SELECT * FROM employee WHERE manager_id = ?", [response.managerID], (err, data) => {
            if (err) throw err;
            console.table(data);
            console.log("===================================");
            employeeQuest();
        });
        
    });
}

//Function adds new employee
addEmployee = () => {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter employee's first name:"
        },
        {   name: "lastName",
            type: "input",
            message: "Enter employee's last name:"
        },
        {
            name: "roleID",
            type: "number",
            message: "Enter employee's role ID#:"
        },
        {
            name: "managerID",
            type: "number",
            message: "Enter employee's manager ID#:"
        }
    ]).then((response) => {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.firstName, response.lastName, response.roleID, response.managerID], (err, data) => {
            if (err) throw err;
            console.table("Employee added!!!");
            console.log("===================================");
            employeeQuest();
        })

    })
}

// Function adds new department
addDepartment = () => {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "Enter department name:"
        }
    ]).then((response) => {
        connection.query("INSERT INTO department (name) VALUES (?)", [response.department], (err, data) => {
            if (err) throw err;
            console.table("Department added!!!");
            console.log("===================================");
            employeeQuest();
        });
    });
};

// Function adds new role
addRole = () => {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Enter role title:"
        },
        {
            name: "salary",
            type: "number",
            message: "Enter salary:"
        },
        {
            name: "departmentID",
            type: "number",
            message: "Enter department ID:"
        }
    ]).then((response) => {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", [response.title, response.salary, response.departmentID], (err, data) => {
            if (err) throw err;
            console.table("Role added!!!");
            console.log("===================================");
            employeeQuest();
        });
    });
};

// Function updates employee's role
updateEmployeeRole = () => {
    inquirer.prompt([
        {
            name: "employeeID",
            type: "number",
            message: "Enter employee ID# to update role:"
        },
        {
            name: "roleID",
            type: "number",
            message: "Enter new role ID# to make change:"
        }
    ]).then((response) => {
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [response.roleID, response.employeeID], (err, data) => {
            if (err) throw err;
            console.log("Employee's role ID# has been updated!!!");
            console.log("==================================");
            employeeQuest();
        })
    })
}

// Function updates employee's manager
updateEmployeesManager = () => {
    inquirer.prompt([
        {
            name: "employeeID",
            type: "number",
            message: "Enter employee ID# to update manager:"
        },
        {
            name: "managerID",
            type: "number",
            message: "Enter new manager ID# to make change:"
        }
    ]).then((response) => {
        connection.query("UPDATE employee SET manager_id = ? WHERE id = ?", [response.managerID, response.employeeID], (err, data) => {
            if (err) throw err;
            console.log("Employee's manager ID# has been updated!!!");
            console.log("===================================");
            employeeQuest();
        })
    })

}

// Function deletes employee
deleteEmployee = () => {
    inquirer.prompt([
        {
            name: "employeeID",
            input: "number",
            message: "Enter employee ID to delete:"
        } 
    ]).then((response) => {
        connection.query("DELETE FROM employee WHERE id = ?", [response.employeeID], (err, data) => {
            if (err) throw err;
            console.table("Employee has been deleted");
            console.log("===================================");
            employeeQuest();
        })
    });
};

// Function deletes department
deleteDepartment = () => {
    inquirer.prompt([
        {
            name: "departmentID",
            input: "number",
            message: "Enter department ID to delete:"
        } 
    ]).then((response) => {
        connection.query("DELETE FROM department WHERE id = ?", [response.departmentID], (err, data) => {
            if (err) throw err;
            console.table("Department has been deleted");
            console.log("===================================");
            employeeQuest();
        })
    });

}

// Function deletes role
deleteRole = () => {
    inquirer.prompt([
        {
            name: "roleID",
            input: "number",
            message: "Enter role ID to delete:"
        } 
    ]).then((response) => {
        connection.query("DELETE FROM role WHERE id = ?", [response.roleID], (err, data) => {
            if (err) throw err;
            console.table("Role has been deleted!!!");
            console.log("===================================");
            employeeQuest();
        })
    });
}