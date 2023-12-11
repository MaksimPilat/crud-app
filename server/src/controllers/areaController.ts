import type { Request, Response } from 'express';
import {
  addAreaToDatabase,
  getAllAreasFromDatabase,
  updateAreaInDatabase,
  deleteAreaFromDatabase,
  deleteEquipmentBatchFromDatabase,
  getEquipmentsByAreaIdFromDatabase,
  deleteInspectionBatchFromDatabase,
  getInspectionsByEquipmentIdsFromDatabase,
} from '@services';
import type { IArea, IFetchedEquipment, IFetchedInspection } from '@types';
import { pool } from '@database';
import { PoolClient } from 'pg';

export const addArea = async (req: Request, res: Response) => {
  const { name }: Omit<IArea, 'id'> = req.body;

  try {
    const newArea: IArea = await addAreaToDatabase(name);
    return res.status(200).json(newArea);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    throw err;
  }
};

export const getAllAreas = async (req: Request, res: Response) => {
  try {
    const areas: IArea[] = await getAllAreasFromDatabase();
    return res.status(200).json(areas);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    throw err;
  }
};

export const updateArea = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid equipment ID' });
  }
  const { name }: Omit<IArea, 'id'> = req.body;

  try {
    await updateAreaInDatabase({ id, name });
    return res.status(200).json('Area was updated successfully!');
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    throw err;
  }
};

export const deleteArea = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid equipment ID' });
  }

  const client: PoolClient = await pool.connect();

  try {
    await client.query('BEGIN');

    const equipments: IFetchedEquipment[] =
      await getEquipmentsByAreaIdFromDatabase(id);
    const equipmentIds: number[] = equipments.map((item) => item.id);
    await deleteEquipmentBatchFromDatabase(equipmentIds);

    const inspections: IFetchedInspection[] =
      await getInspectionsByEquipmentIdsFromDatabase(equipmentIds);
    const inspectionIds: number[] = inspections.map((item) => item.id);
    await deleteInspectionBatchFromDatabase(inspectionIds);

    await deleteAreaFromDatabase(id);

    await client.query('COMMIT');

    return res.status(200).json('Area was deleted successfully!');
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: (err as Error).message });
    throw err;
  } finally {
    client.release();
  }
};
