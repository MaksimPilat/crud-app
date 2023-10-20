import { Router } from "express";
import { addEmployee, getAllEmployees, updateEmployee, deleteEmployee } from "@controllers";

const employeesRouter = Router();

employeesRouter.post("/", addEmployee);
employeesRouter.get("/", getAllEmployees);
employeesRouter.put("/:id", updateEmployee);
employeesRouter.delete("/:id", deleteEmployee);

export default employeesRouter;
