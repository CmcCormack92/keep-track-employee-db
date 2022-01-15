INSERT INTO department (dept_name)
VALUES 
('Sales'), 
('Service'), 
('Accounting'), 
('Dispatch');

INSERT INTO position (title, salary, department_id)
VALUES
('Sales Manager', 180000.00, 1),
('Sales Person', 110000.00, 1),
('Service Manager', 150000.00, 2),
('Service Technician', 85000.00, 2),
('Lead Accountant', 115000.00, 3),
('Accountant', 90000.00, 3),
('Disbatch Manager', 75000.00, 4),
('Disbatcher', 55000.00, 4);


INSERT INTO employee (first_name, last_name, position_id, manager_id)
VALUES 
  ('James', 'Fraser', 1, NULL),
  ('Jack', 'London', 2, 1),
  ('Robert', 'Bruce', 3, NULL),
  ('Peter', 'Greenaway', 4, 3),
  ('Derek', 'Jarman', 4, 3),
  ('Paolo', 'Pasolini', 5, NULL),
  ('Heathcote', 'Williams', 6, 6),
  ('Sandy', 'Powell', 7, NULL),
  ('Emil', 'Zola', 8, 8),
  ('Sissy', 'Coalpits', 8, 8);