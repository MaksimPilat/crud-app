import { Router } from "express";
import { addEquipment, getAllEquipments, updateEquipment, deleteEquipment } from "@controllers";
import { getEquipment } from "controllers/equipmentController";

const equipmentRouter = Router();

equipmentRouter.post("/", addEquipment);
equipmentRouter.get("/", getAllEquipments);
equipmentRouter.get("/:id", getEquipment);
equipmentRouter.put("/:id", updateEquipment);
equipmentRouter.delete("/:id", deleteEquipment);

export default equipmentRouter;
