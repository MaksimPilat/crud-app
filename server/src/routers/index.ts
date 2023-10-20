import express, { Router } from "express";
import areasRouter from "./areasRouter";
import equipmentsRouter from "./equipmentsRouter";
import inspectionsRouter from "./inspectionsRouter";
import employeesRouter from "./employeesRouter";

const prefixRoutes = (prefix: string, router: Router) => {
  return express.Router().use(prefix, router);
};

const prefixedAreasRouter = prefixRoutes("/areas", areasRouter);
const prefixedEquipmentRouter = prefixRoutes("/equipments", equipmentsRouter);
const prefixedInspectionsRouter = prefixRoutes("/inspections", inspectionsRouter);
const prefixedEmployeesRouter = prefixRoutes("/employees", employeesRouter);

export {
  prefixedAreasRouter as areasRouter,
  prefixedEquipmentRouter as equipmentsRouter,
  prefixedInspectionsRouter as inspectionsRouter,
  prefixedEmployeesRouter as employeesRouter,
};
