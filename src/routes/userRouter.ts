import { Router } from "express";
import { validateToken } from "../middlewares/validateToken";
import userController from "../controllers/userController";

const userRouter = Router();

userRouter.use(validateToken);
userRouter.get("/:id?", userController.getUser);
userRouter.get("/all", userController.getAllUsers);

export default userRouter;