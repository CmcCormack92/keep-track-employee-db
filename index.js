const inquirer = require('inquirer');
const db = require('./db/connection');
const { viewDept, viewRole, viewEmployees, newDepartment, newRole, newEmployee, updateEmployee} = require('./utils/index');


function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'Please choose one of the following options:',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
        }
    ]).then(answer => {
        if (answer.options === 'View all departments') {
            return viewDept();
        }
        else if (answer.options === 'View all roles') {
            return viewRole();
        }
        else if (answer.options === 'View all employees') {
            return viewEmployees();
        }
        else if (answer.options === 'Add a department') {
            return newDepartment();
                
        }
        else if (answer.options === 'Add a role') {
            return newRole();
        }
        else if (answer.options === 'Add an employee') {
            return newEmployee();
        } 
        else if (answer.options === 'Update an employee role') {
            return updateEmployee();
        } else {
            process.exit(0);
        }
    });
};


init();
