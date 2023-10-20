import { Request, Response } from "express";
import {
  addEquipmentToDatabase,
  getAllEquipmentsFromDatabase,
  updateEquipmentInDatabase,
  deleteEquipmentFromDatabase,
  getEquipmentFromDatabase,
} from "@services";
import { IEquipment, IFetchedEquipment } from "@types";

export const addEquipment = async (req: Request, res: Response) => {
  const { name, areaId, isWorking }: Omit<IEquipment, "id"> = req.body;

  try {
    const newEquipment: IFetchedEquipment = await addEquipmentToDatabase({ name, areaId, isWorking });
    res.status(200).json(newEquipment);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    throw err;
  }
};

export const getAllEquipments = async (req: Request, res: Response) => {
  const isWorkingParam = req.query.isWorking as string;
  const isWorking = isWorkingParam === "true" ? true : isWorkingParam === "false" ? false : undefined;

  try {
    const equipment: IFetchedEquipment[] = await getAllEquipmentsFromDatabase(isWorking);
    res.status(200).json(equipment);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    throw err;
  }
};

export const getEquipment = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid equipment ID" });
  }

  try {
    const equipment = await getEquipmentFromDatabase(id);
    res.status(200).json(equipment);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    throw err;
  }
};

export const updateEquipment = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid equipment ID" });
  }
  const { name, areaId, isWorking }: Omit<IEquipment, "id"> = req.body;

  try {
    await updateEquipmentInDatabase({ id, name, areaId, isWorking });
    res.status(200).json("Equipment was updated successfully!");
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    throw err;
  }
};

export const deleteEquipment = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid equipment ID" });
  }

  try {
    await deleteEquipmentFromDatabase(id);
    res.status(200).json("Equipment was deleted successfully!");
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    throw err;
  }
};
