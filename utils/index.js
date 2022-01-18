const db = require('../db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');

const viewDept = () => {
  const sql = `SELECT * from department;`;

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      return;
    }
    const table = cTable.getTable(results);
    console.log(table);
    next();
  });
};

const viewRole = () => {
  const sql = `SELECT role.*, department.dept_name AS department FROM role LEFT JOIN department ON role.department_id = department.id;`;

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      return;
    }
    const table = cTable.getTable(results);
    console.log(table);
    next();
  });
};

const viewEmployees = () => {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dept_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      return;
    }
    const table = cTable.getTable(results);
    console.log(table);
    next();
  });
};

const addDept = (newDepartment) => {
  const sql = `INSERT INTO department (dept_name) VALUES (?);`
  const params = [newDepartment.name];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
      viewDept();
    }
  });
};

const addRole = newRole => {
  const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`
  const params = [newRole.title, newRole.salary, newRole.department]
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
      viewRole();
    }
  });
};

const addEmployee = answers => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`
  const params = [answers[0].firstName, answers[0].lastName, answers[1].role, answers[2].manager];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
      viewEmployees();
    }
  });
};

const updateEmp = answers => {
  const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
  const params = [answers[1].role, answers[0].employee];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
     viewEmployees();
    }
  });
};

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

function next() {
  inquirer.prompt([
      {
          type: 'list',
          name: 'options',
          message: 'Please choose one of the following options:',
          choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
      }
   ])
  .then(answer => {
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

module.exports = { viewDept, viewRole, viewEmployees, newDepartment, newRole, newEmployee, updateEmployee };

