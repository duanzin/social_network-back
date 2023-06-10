import { Router } from "express";
import authRouter from "./authRouter";
import postRouter from "./postRouter";

const routes = Router();

routes.use("/auth", authRouter).use("/post", postRouter);

export default routes;
