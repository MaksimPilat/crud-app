CREATE DATABASE equipment_accounting;

CREATE TABLE areas(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

TRUNCATE TABLE areas;
DROP TABLE areas;

CREATE TABLE equipment(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  area_id INT NOT NULL,
  is_working BOOLEAN NOT NULL
);

TRUNCATE TABLE equipment;
DROP TABLE equipment;

CREATE TABLE inspections(
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  equipment_id INT NOT NULL,
  employee_id INT NOT NULL,
  result BOOLEAN NOT NULL,
  cause_of_failure VARCHAR(50)
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