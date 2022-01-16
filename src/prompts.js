const inquirer = require('inquirer');
const db = require('../db/connection');
const { addDept, addEmployee, updateEmp, addRole } = require('../utils');

const newDepartment = () => {
    inquirer.prompt([
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
    ]).then(addDept);
};

const newRole = () => {
    const sql = `SELECT department.dept_name, department.id FROM department`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return;
        }
        const dept = data.map(({ id, dept_name }) => ({ name: dept_name, value: id }));
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter new role title!',
                validate: titleInput => {
                    if (titleInput) {
                        return true;
                    } else {
                        console.log("Please enter the role title!");
                        return false;
                    }
                }
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Enter the yearly salary for this role!',
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
                type: 'list',
                name: 'department',
                message: 'What department is this role under?',
                choices: dept
            }
        ]).then(addRole);
    });
};



const newEmployee = () => {
    inquirer.prompt([
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
        }
    ]).then((name) => {
        answers = [{ firstName: name.firstName, lastName: name.lastName }]
        const sqlRole = `SELECT role.title, role.id FROM role;`;
        db.query(sqlRole, (err, data) => {
            if (err) {
                console.log(err)
                return;
            }
            const roles = data.map(({ id, title }) => ({ name: title, value: id }));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'What role is this employee?',
                    choices: roles
                }
            ]).then(roleResult => {
                const role = { role: roleResult.role };
                answers.push(role);
                const sqlMan = `SELECT first_name, last_name, id FROM employee WHERE manager_id IS NULL;`
                db.query(sqlMan, (err, data) => {
                    if (err) {
                        console.log(err)
                        return;
                    }
                    const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));;
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: 'Choose the manager this employee is under!',
                            choices: managers
                        }
                    ]).then(manResult => {
                        const manager = { manager: manResult.manager };
                        answers.push(manager);
                        addEmployee(answers);
                    })
                });
            });
        });
    });
};

const updateEmployee = () => {
    const sql = `SELECT employee.first_name, employee.last_name, employee.id FROM employee;`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return;
        }
        const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employees role would you like to change?',
                choices: employees
            }
        ]).then(employeeResult => {
            answers = [{employee: employeeResult.employee}]
            const sqlRole = `SELECT role.title, role.id FROM role;`;
            db.query(sqlRole, (err, data) => {
                if (err) {
                    console.log(err)
                    return;
                }
                const roles = data.map(({ id, title }) => ({ name: title, value: id }));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'newRole',
                        message: 'Pick your employees new role!',
                        choices: roles
                    }
                ]).then(roleResult => {
                    const role = { role: roleResult.newRole };
                    answers.push(role);
                    updateEmp(answers);
                })
            });
        });
    });
};
module.exports = { newDepartment, newRole, newEmployee, updateEmployee };