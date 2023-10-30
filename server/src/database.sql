CREATE DATABASE equipment_accounting;

CREATE TABLE areas(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

TRUNCATE TABLE areas;
DROP TABLE areas;

CREATE TABLE equipments(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  area_id INT NOT NULL,
  is_working BOOLEAN NOT NULL,
  FOREIGN KEY (area_id) REFERENCES areas (id)
);

TRUNCATE TABLE equipments;
DROP TABLE equipments;

CREATE TABLE inspections(
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  equipment_id INT NOT NULL,
  employee_id INT NOT NULL,
  result BOOLEAN NOT NULL,
  cause_of_failure VARCHAR(50),
  FOREIGN KEY (equipment_id) REFERENCES equipments (id) ON DELETE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE
);

TRUNCATE TABLE inspections;
DROP TABLE inspections;

CREATE TABLE employees(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  position VARCHAR(50) NOT NULL
);

TRUNCATE TABLE employees;
DROP TABLE employees;