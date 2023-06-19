import { Router } from "express";
import authRouter from "./authRouter";
import postRouter from "./postRouter";
import userRouter from "./userRouter";
import relationshipRouter from "./relationshipRouter";

const routes = Router();

routes
  .use("/auth", authRouter)
  .use("/user", userRouter)
  .use("/relationship", relationshipRouter)
  .use("/post", postRouter);

export default routes;
