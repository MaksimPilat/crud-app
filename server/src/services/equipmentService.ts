import { pool } from '../database/db';
import type { IEquipment, IFetchedEquipment } from '@types';

export const addEquipmentToDatabase = async ({
  name,
  areaId,
  isWorking,
}: Omit<IEquipment, 'id'>): Promise<IFetchedEquipment> => {
  const equipmentQueryText = `
    INSERT INTO equipments (name, area_id, is_working)
    VALUES ($1, $2, $3)
    RETURNING
      id,
      name,
      area_id as "areaId",
      (
        SELECT areas.name
        FROM areas
        WHERE areas.id = equipments.area_id
      ) AS "areaName",
      is_working as "isWorking";
  `;

  const equipmentQueryValues = [name, areaId, isWorking];

  try {
    const result = await pool.query(equipmentQueryText, equipmentQueryValues);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const getAllEquipmentsFromDatabase = async (
  isWorking?: boolean
): Promise<IFetchedEquipment[]> => {
  let queryText = `
    SELECT
      equipments.id,
      equipments.name,
      equipments.area_id AS "areaId",
      areas.name AS "areaName",
      equipments.is_working AS "isWorking"
    FROM
      equipments
    JOIN
      areas ON areas.id = equipments.area_id
  `;
  const queryValues = [];

  if (isWorking !== undefined) {
    queryText += ` WHERE equipments.is_working = $1`;
    queryValues.push(isWorking);
  }

  try {
    const result = await pool.query(queryText, queryValues);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

export const getEquipmentFromDatabase = async (
  id: number
): Promise<IFetchedEquipment> => {
  const queryText = `
    SELECT
      equipments.id,
      equipments.name,
      equipments.area_id AS "areaId",
      (
        SELECT areas.name
        FROM areas
        WHERE areas.id = equipments.area_id
      ) AS "areaName",
      equipments.is_working AS "isWorking"
    FROM
      equipments
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

export const getEquipmentsByAreaIdFromDatabase = async (
  areaId: number
): Promise<IFetchedEquipment[]> => {
  let queryText = `
    SELECT
      equipments.id,
      equipments.name,
      equipments.area_id AS "areaId",
      areas.name AS "areaName",
      equipments.is_working AS "isWorking"
    FROM
      equipments
    JOIN
      areas ON areas.id = equipments.area_id
    WHERE
      equipments.area_id = $1
  `;
  const queryValues = [areaId];

  try {
    const result = await pool.query(queryText, queryValues);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

export const updateEquipmentInDatabase = async ({
  id,
  name,
  areaId,
  isWorking,
}: IEquipment): Promise<void> => {
  const queryText = `
    UPDATE equipments
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

export const deleteEquipmentFromDatabase = async (
  id: number
): Promise<void> => {
  const queryText = `
    DELETE FROM equipments
    WHERE id = $1
  `;
  const queryValues = [id];

  try {
    await pool.query(queryText, queryValues);
  } catch (err) {
    throw err;
  }
};

export const deleteEquipmentBatchFromDatabase = async (
  ids: number[]
): Promise<void> => {
  const queryText = `
    DELETE FROM equipments
    WHERE id = ANY($1)
  `;
  const queryValues = [ids];

  try {
    await pool.query(queryText, queryValues);
  } catch (err) {
    throw err;
  }
};
