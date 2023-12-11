import express, { Express, Router } from 'express';
import cors from 'cors';
import {
  areaRouter,
  equipmentRouter,
  inspectionRouter,
  employeeRouter,
  authRouter,
} from '@routers';
import { authMiddleware } from '@middlewares';

const app: Express = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const dataRouter = express.Router();

dataRouter.use(authMiddleware);
dataRouter.use('/areas', areaRouter);
dataRouter.use('/equipments', equipmentRouter);
dataRouter.use('/inspections', inspectionRouter);
dataRouter.use('/employees', employeeRouter);

app.use('/api/data', dataRouter);
app.use('/api/auth', authRouter);
