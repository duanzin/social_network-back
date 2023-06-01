import express, { Express } from "express";
import cors from "cors";
import { loadEnv } from "config/envs";
import { connectDb, disconnectDB } from "./config/database";
import routes from "./routes/index";
import { handleApplicationErrors } from "./middlewares/errorHandlingMiddleware";

loadEnv();

const app = express();

app
  .use(cors())
  .options("*", cors())
  .use(express.json())
  .use(routes)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
