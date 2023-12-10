import { Router } from 'express';
import { addArea, getAllAreas, updateArea, deleteArea } from '@controllers';

const areaRouter = Router();

areaRouter.post('/', addArea);
areaRouter.get('/', getAllAreas);
areaRouter.put('/:id', updateArea);
areaRouter.delete('/:id', deleteArea);

export default areaRouter;
