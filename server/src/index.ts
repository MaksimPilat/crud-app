import express, { Express } from 'express';
import cors from 'cors';
import {
  areasRouter,
  equipmentsRouter,
  inspectionsRouter,
  employeesRouter,
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

app.use(
  '/api',
  authMiddleware,
  areasRouter,
  equipmentsRouter,
  inspectionsRouter,
  employeesRouter
);

app.use(authRouter);
