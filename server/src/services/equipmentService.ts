import { pool } from "../db";
import { IEquipment, IFetchedEquipment } from "@types";

export const addEquipmentToDatabase = async ({
  name,
  areaId,
  isWorking,
}: Omit<IEquipment, "id">): Promise<IFetchedEquipment> => {
  const areaQueryText = `
    SELECT id
    FROM areas
    WHERE id = $1
  `;
  const areaQueryValues = [areaId];

  try {
    const areaResult = await pool.query(areaQueryText, areaQueryValues);
    if (areaResult.rows.length === 0) {
      throw new Error(`Area with id ${areaId} does not exist.`);
    }

    const equipmentQueryText = `
      INSERT INTO equipment (name, area_id, is_working)
      VALUES ($1, $2, $3)
      RETURNING
        id,
        name,
        area_id as "areaId",
        (
          SELECT areas.name
          FROM areas
          WHERE areas.id = equipment.area_id
        ) AS "areaName",
        is_working as "isWorking";
    `;
    const equipmentQueryValues = [name, areaId, isWorking];

    const result = await pool.query(equipmentQueryText, equipmentQueryValues);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const getAllEquipmentsFromDatabase = async (isWorking?: boolean): Promise<IFetchedEquipment[]> => {
  let queryText = `
    SELECT
      equipment.id,
      equipment.name,
      equipment.area_id AS "areaId",
      areas.name AS "areaName",
      equipment.is_working AS "isWorking"
    FROM
      equipment
    JOIN
      areas ON areas.id = equipment.area_id
  `;
  const queryValues = [];

  if (isWorking !== undefined) {
    queryText += ` WHERE equipment.is_working = $1`;
    queryValues.push(isWorking);
  }

  try {
    const result = await pool.query(queryText, queryValues);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

export const getEquipmentFromDatabase = async (id: number): Promise<IFetchedEquipment> => {
  const queryText = `
    SELECT
      equipment.id,
      equipment.name,
      equipment.area_id AS "areaId",
      (
        SELECT areas.name
        FROM areas
        WHERE areas.id = equipment.area_id
      ) AS "areaName",
      equipment.is_working AS "isWorking"
    FROM
      equipment
    WHERE
      id = $1
  `;
  const queryValues = [id];

  try {
    const result = await pool.query(queryText, queryValues);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const getEquipmentsByAreaIdFromDatabase = async (areaId: number): Promise<IFetchedEquipment[]> => {
  let queryText = `
    SELECT
      equipment.id,
      equipment.name,
      equipment.area_id AS "areaId",
      areas.name AS "areaName",
      equipment.is_working AS "isWorking"
    FROM
      equipment
    JOIN
      areas ON areas.id = equipment.area_id
    WHERE
    equipment.area_id = $1
  `;
  const queryValues = [areaId];

  try {
    const result = await pool.query(queryText, queryValues);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

export const updateEquipmentInDatabase = async ({ id, name, areaId, isWorking }: IEquipment): Promise<void> => {
  const queryText = `
    UPDATE equipment
    SET
      name = $1,
      area_id = $2,
      is_working = $3
    WHERE id = $4
  `;
  const queryValues = [name, areaId, isWorking, id];

  try {
    await pool.query(queryText, queryValues);
  } catch (err) {
    throw err;
  }
};

export const deleteEquipmentFromDatabase = async (id: number): Promise<void> => {
  const queryText = `
    DELETE FROM equipment
    WHERE id = $1
  `;
  const queryValues = [id];

  try {
    await pool.query(queryText, queryValues);
  } catch (err) {
    throw err;
  }
};

export const deleteEquipmentBatchFromDatabase = async (ids: number[]): Promise<void> => {
  const queryText = `
    DELETE FROM equipment
    WHERE id = ANY($1)
  `;
  const queryValues = [ids];

  try {
    await pool.query(queryText, queryValues);
  } catch (err) {
    throw err;
  }
};
