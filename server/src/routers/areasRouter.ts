import { Router } from "express";
import { addArea, getAllAreas, updateArea, deleteArea } from "@controllers";

const areasRouter = Router();

areasRouter.post("/", addArea);
areasRouter.get("/", getAllAreas);
areasRouter.put("/:id", updateArea);
areasRouter.delete("/:id", deleteArea);

export default areasRouter;
