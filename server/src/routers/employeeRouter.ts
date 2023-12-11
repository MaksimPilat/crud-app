import { Router } from 'express';
import {
  addEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} from '@controllers';

export const employeeRouter = Router();

employeeRouter.post('/', addEmployee);
employeeRouter.get('/', getAllEmployees);
employeeRouter.put('/:id', updateEmployee);
employeeRouter.delete('/:id', deleteEmployee);
