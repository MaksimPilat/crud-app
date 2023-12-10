import { Request, Response } from 'express';
import {
  addEmployeeToDatabase,
  getAllEmployeesFromDatabase,
  updateEmployeeInDatabase,
  deleteEmployeeFromDatabase,
} from '@services';
import type { IEmployee } from '@types';

export const addEmployee = async (req: Request, res: Response) => {
  const { name, position }: Omit<IEmployee, 'id'> = req.body;

  try {
    const newEmployee: IEmployee = await addEmployeeToDatabase({
      name,
      position,
    });
    res.status(200).json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    throw err;
  }
};

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees: IEmployee[] = await getAllEmployeesFromDatabase();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    throw err;
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid equipment ID' });
  }

  try {
    const { name, position }: Omit<IEmployee, 'id'> = req.body;
    await updateEmployeeInDatabase({ id, name, position });
    res.status(200).json('Employee was updated successfully!');
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    throw err;
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid equipment ID' });
  }

  try {
    await deleteEmployeeFromDatabase(id);
    res.status(200).json('Employee was deleted successfully!');
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    throw err;
  }
};
