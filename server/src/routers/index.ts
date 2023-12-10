import express, { Router } from 'express';
import areasRouter from './areaRouter';
import equipmentsRouter from './equipmentRouter';
import inspectionsRouter from './inspectionRouter';
import employeesRouter from './employeeRouter';
import authRouter from './authRouter';

const prefixRouter = (prefix: string, router: Router) => {
  return express.Router().use(prefix, router);
};

const prefixedAreasRouter = prefixRouter('/areas', areasRouter);
const prefixedEquipmentRouter = prefixRouter('/equipments', equipmentsRouter);
const prefixedInspectionsRouter = prefixRouter(
  '/inspections',
  inspectionsRouter
);
const prefixedEmployeesRouter = prefixRouter('/employees', employeesRouter);
const prefixedAuthRouter = prefixRouter('/auth', authRouter);

export {
  prefixedAreasRouter as areasRouter,
  prefixedEquipmentRouter as equipmentsRouter,
  prefixedInspectionsRouter as inspectionsRouter,
  prefixedEmployeesRouter as employeesRouter,
  prefixedAuthRouter as authRouter,
};
