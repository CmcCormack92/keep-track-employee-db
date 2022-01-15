const inquirer = require('inquirer');

const mainPrompt = [
        {
            type: 'list',
            name: 'options',
            message: 'Please choose one of the following options:',
            choices: ['View all departments', 'View all positions', 'View all employees', 'Add a department', 'Add a position', 'Add an employee', 'Update an employee role']
        }
    ];


const newDepartment = [
        {
            type: 'input',
            name: 'name',
            message: 'Enter new department name!',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the department name!");
                    return false;
                }
            }
        }
    ];

const newPosition = [
        {
            type: 'input',
            name: 'title',
            message: 'Enter new position title!',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log("Please enter the position title!");
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Enter the yearly salary for this position!',
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } else {
                    console.log("Please enter the position's salary!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'department',
            message: 'Enter the department this position is in!',
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                } else {
                    console.log("Please enter the department!");
                    return false;
                }
            }
        }
    ];

const newEmployee = [
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter employee first name!',
            validate: firstNameInput => {
                if (firstNameInput) {
                    return true;
                } else {
                    console.log("Please enter employee first name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the employee last name!',
            validate: lastNameInput => {
                if (lastNameInput) {
                    return true;
                } else {
                    console.log("Please enter the employee last name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'position',
            message: 'Enter the employee position!',
            validate: positionInput => {
                if (positionInput) {
                    return true;
                } else {
                    console.log("Please enter the employee position!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Enter the manager of this employee',
            validate: managerInput => {
                if (managerInput) {
                    return true;
                } else {
                    console.log("Please enter the employee manager!");
                    return false;
                }
            }
        }
    ];

const updateEmployee = [
        {
            type: 'input',
            name: 'newPosition',
            message: 'Enter new employee position!',
            validate: newPositionInput => {
                if (newPositionInput) {
                    return true;
                } else {
                    console.log("Please enter the new employee position!");
                    return false;
                }
            }
        }
    ];

module.exports = {mainPrompt, newDepartment, newPosition, newEmployee, updateEmployee};