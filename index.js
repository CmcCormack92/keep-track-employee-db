const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');
const {mainPrompt, newDepartment, newPosition, newEmployee, updateEmployee} = require('./src/prompts');
const {viewDept, viewPositions, viewEmployees, addDept, addPos, addEmployee, updateEmp} = require('./utils/index');
const { update } = require('lodash');

inquirer.prompt(mainPrompt)
.then(answer => {
    if (answer === 'View all departments'){
        viewDept();
    } 
    else if (answer === 'View all positions') {
        viewPositions();
    }
    else if (answer === 'View all employees') {
        viewEmployees();
    }
    else if (answer === 'Add a department') {
        addDept();
    }
    else if (answer === 'Add a position') {
        addPos();
    }
    else if (answer === 'Add an employee') {
        addEmployee();
    } else {
        updateEmp();
    }
})