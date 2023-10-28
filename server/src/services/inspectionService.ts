import { pool } from "../db";
import { IInspection, IFetchedInspection } from "@types";

export const addInspectionToDatabase = async ({
  date,
  equipmentId,
  employeeId,
  result,
  causeOfFailure,
}: Omit<IInspection, "id">): Promise<IFetchedInspection> => {
  const equipmentQueryText = `
    SELECT id
    FROM equipments
    WHERE id = $1
  `;
  const equipmentQueryValues = [equipmentId];

  const employeeQueryText = `
    SELECT id
    FROM employees
    WHERE id = $1
  `;
  const employeeQueryValues = [employeeId];

  const queryText = `
    INSERT
    INTO inspections (date, equipment_id, employee_id, result, cause_of_failure)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
      id,
      TO_CHAR(date, 'YYYY-MM-DD') AS "date",
      equipment_id AS "equipmentId",
      employee_id AS "employeeId",
      (
        SELECT employees.name
        FROM employees
        WHERE employees.id = inspections.employee_id
      ) AS "employeeName",
      result,
      cause_of_failure AS "causeOfFailure"
  `;
  const queryValues = [date, equipmentId, employeeId, result, causeOfFailure];

  try {
    const equipmentResult = await pool.query(equipmentQueryText, equipmentQueryValues);
    if (equipmentResult.rows.length === 0) {
      throw new Error(`Equipment with id ${equipmentId} does not exist.`);
    }

    const employeeResult = await pool.query(employeeQueryText, employeeQueryValues);
    if (employeeResult.rows.length === 0) {
      throw new Error(`Employee with id ${employeeId} does not exist.`);
    }

    const result = await pool.query(queryText, queryValues);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const getInspectionsByEquipmentIdsFromDatabase = async (
  equipmentIds: number[]
): Promise<IFetchedInspection[]> => {
  const queryText = `
    SELECT
      inspections.id,
      TO_CHAR(inspections.date, 'YYYY-MM-DD') AS "date",
      employees.id AS "employeeId",
      employees.name AS "employeeName",
      inspections.result,
      inspections.cause_of_failure AS "causeOfFailure"
    FROM
      inspections
    JOIN
      employees ON employees.id = inspections.employee_id
    WHERE
      inspections.equipment_id = ANY($1)
    ORDER BY
      inspections.date DESC
  `;
  const queryValues = [equipmentIds];

  try {
    const result = await pool.query(queryText, queryValues);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

export const getInspectionsByEmployeeIdFromDatabase = async (employeeId: number): Promise<IFetchedInspection[]> => {
  const queryText = `
    SELECT
      inspections.id,
      TO_CHAR(inspections.date, 'YYYY-MM-DD') AS "date",
      employees.id AS "employeeId",
      employees.name AS "employeeName",
      inspections.result,
      inspections.cause_of_failure AS "causeOfFailure"
    FROM
      inspections
    JOIN
      employees ON employees.id = inspections.employee_id
    WHERE
      employee_id = $1
  `;
  const queryValues = [employeeId];

  try {
    const result = await pool.query(queryText, queryValues);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

export const updateInspectionInDatabase = async ({
  id,
  date,
  employeeId,
  result,
  causeOfFailure,
}: Omit<IInspection, "equipmentId">): Promise<void> => {
  const queryText = `
    UPDATE inspections
    SET
      date = $1,
      employee_id = $2,
      result = $3,
      cause_of_failure = $4
    WHERE id = $5
  `;
  const queryValues = [date, employeeId, result, causeOfFailure, id];

  try {
    await pool.query(queryText, queryValues);
  } catch (err) {
    throw err;
  }
};

export const deleteInspectionFromDatabase = async (id: number): Promise<void> => {
  const queryText = `
    DELETE FROM inspections
    WHERE id = $1
  `;
  const queryValues = [id];

  try {
    await pool.query(queryText, queryValues);
  } catch (err) {
    throw err;
  }
};

export const deleteInspectionBatchFromDatabase = async (ids: number[]): Promise<void> => {
  const queryText = `
    DELETE FROM inspections
    WHERE id = ANY($1)
  `;
  const queryValues = [ids];

  try {
    await pool.query(queryText, queryValues);
  } catch (err) {
    throw err;
  }
};
