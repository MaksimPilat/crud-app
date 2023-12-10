import { Router } from 'express';
import {
  addEquipment,
  getAllEquipments,
  getEquipment,
  updateEquipment,
  deleteEquipment,
} from '@controllers';

const equipmentRouter = Router();

equipmentRouter.post('/', addEquipment);
equipmentRouter.get('/', getAllEquipments);
equipmentRouter.get('/:id', getEquipment);
equipmentRouter.put('/:id', updateEquipment);
equipmentRouter.delete('/:id', deleteEquipment);

export default equipmentRouter;
