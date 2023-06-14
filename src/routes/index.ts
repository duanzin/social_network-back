import { Router } from "express";
import authRouter from "./authRouter";
import postRouter from "./postRouter";
import userRouter from "./userRouter";

const routes = Router();

routes
  .use("/auth", authRouter)
  .use("/user", userRouter)
  .use("/post", postRouter);

export default routes;
