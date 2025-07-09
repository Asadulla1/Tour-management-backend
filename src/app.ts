import cors from "cors";
// main application file work for communicate with backend
import express from "express";
import { router } from "./routes";

import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

import { notFoundROute } from "./app/middlewares/notFoundRoute";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/", router);

app.get("/", (req, res) => {
  res.json("Working Mamu!!!!!");
});

app.use(globalErrorHandler);

app.use(notFoundROute);

export default app;
