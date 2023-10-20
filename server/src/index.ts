import express, { Express } from "express";
import cors from "cors";
import { areasRouter, equipmentsRouter, inspectionsRouter, employeesRouter } from "@routers";

const app: Express = express();
app.use(cors());
app.use(express.json());

const port: number = 3001;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use("/api", areasRouter, equipmentsRouter, inspectionsRouter, employeesRouter);
