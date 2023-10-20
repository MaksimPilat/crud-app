import { Router } from "express";
import { addInspection, getEquipmentInspections, updateInspection, deleteInspection } from "@controllers";

const inspectionsRouter = Router();

inspectionsRouter.post("/", addInspection);
inspectionsRouter.get("/:id", getEquipmentInspections);
inspectionsRouter.put("/:id", updateInspection);
inspectionsRouter.delete("/:id", deleteInspection);

export default inspectionsRouter;
