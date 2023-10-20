import { Request, Response } from "express";
import {
  addInspectionToDatabase,
  getInspectionsByEquipmentIdsFromDatabase,
  updateInspectionInDatabase,
  deleteInspectionFromDatabase,
} from "@services";
import { IFetchedInspection, IInspection } from "@types";

export const addInspection = async (req: Request, res: Response) => {
  const { date, equipmentId, employeeId, result, causeOfFailure }: Omit<IInspection, "id"> = req.body;

  try {
    const newInspection: IFetchedInspection = await addInspectionToDatabase({
      date,
      equipmentId,
      employeeId,
      result,
      causeOfFailure,
    });
    res.status(200).json(newInspection);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    throw err;
  }
};

export const getEquipmentInspections = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid equipment ID" });
  }

  try {
    const inspections: IFetchedInspection[] = await getInspectionsByEquipmentIdsFromDatabase([id]);
    res.status(200).json(inspections);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    throw err;
  }
};

export const updateInspection = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid equipment ID" });
  }
  const { date, employeeId, result, causeOfFailure }: Omit<IInspection, "id"> = req.body;

  try {
    await updateInspectionInDatabase({ id, date, employeeId, result, causeOfFailure });
    res.status(200).json("Inspection was updated successfully!");
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    throw err;
  }
};

export const deleteInspection = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid equipment ID" });
  }

  try {
    await deleteInspectionFromDatabase(id);
    res.status(200).json("Inspection was deleted successfully!");
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    throw err;
  }
};
