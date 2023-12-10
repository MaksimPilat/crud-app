import express, { Router } from 'express';
import areasRouter from './areaRouter';
import equipmentsRouter from './equipmentRouter';
import inspectionsRouter from './inspectionRouter';
import employeesRouter from './employeeRouter';
import authRouter from './authRouter';

const prefixRouter = (prefix: string, router: Router) => {
  return express.Router().use(prefix, router);
};

const prefixedAreaRouter = prefixRouter('/areas', areasRouter);
const prefixedEquipmentRouter = prefixRouter('/equipments', equipmentsRouter);
const prefixedInspectionRouter = prefixRouter(
  '/inspections',
  inspectionsRouter
);
const prefixedEmployeeRouter = prefixRouter('/employees', employeesRouter);
const prefixedAuthRouter = prefixRouter('/auth', authRouter);

export {
  prefixedAreaRouter as areaRouter,
  prefixedEquipmentRouter as equipmentRouter,
  prefixedInspectionRouter as inspectionRouter,
  prefixedEmployeeRouter as employeeRouter,
  prefixedAuthRouter as authRouter,
};
