import { pool } from "../db";
import { IArea } from "@types";

export const addAreaToDatabase = async (name: string): Promise<IArea> => {
  const queryText = `
    INSERT INTO areas (name)
    VALUES($1)
    RETURNING *
  `;
  const queryValues = [name];

  try {
    const result = await pool.query(queryText, queryValues);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const getAllAreasFromDatabase = async (): Promise<IArea[]> => {
  const queryText = `
    SELECT id, name
    FROM areas;
  `;

  try {
    const result = await pool.query(queryText);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

export const updateAreaInDatabase = async ({ id, name }: IArea): Promise<void> => {
  const queryText = `
    UPDATE areas
    SET name = $1
    WHERE id = $2
  `;
  const queryValues = [name, id];

  try {
    await pool.query(queryText, queryValues);
  } catch (err) {
    throw err;
  }
};

export const deleteAreaFromDatabase = async (id: number): Promise<void> => {
  const queryText = `
    DELETE FROM areas
    WHERE id = $1
  `;
  const queryValues = [id];

  try {
    await pool.query(queryText, queryValues);
  } catch (err) {
    throw err;
  }
};
