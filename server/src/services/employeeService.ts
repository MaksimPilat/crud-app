import { pool } from "../db";
import type { IEmployee } from "@types";

export const addEmployeeToDatabase = async ({ name, position }: Omit<IEmployee, "id">): Promise<IEmployee> => {
  const queryText = `
    INSERT INTO employees (name, position)
    VALUES ($1, $2)
    RETURNING *
  `;
  const queryValues = [name, position];

  try {
    const result = await pool.query(queryText, queryValues);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const getAllEmployeesFromDatabase = async (): Promise<IEmployee[]> => {
  const queryText = `
    SELECT
      id,
      name,
      position
    FROM
      employees
  `;

  try {
    const result = await pool.query(queryText);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

export const updateEmployeeInDatabase = async ({ id, name, position }: IEmployee): Promise<void> => {
  const queryText = `
    UPDATE employees
    SET
      name = $1,
      position = $2 
    WHERE id = $3
  `;
  const queryValues = [name, position, id];

  try {
    await pool.query(queryText, queryValues);
  } catch (err) {
    throw err;
  }
};

export const deleteEmployeeFromDatabase = async (id: number): Promise<void> => {
  const queryText = `
    DELETE FROM employees
    WHERE id = $1
  `;
  const queryValues = [id];

  try {
    await pool.query(queryText, queryValues);
  } catch (err) {
    throw err;
  }
};
