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





module.exports = { viewDept, viewRole, viewEmployees, addDept, addRole, addEmployee, updateEmp };