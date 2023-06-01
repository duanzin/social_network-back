import { Router } from "express";
import authController from "../controllers/authController";
import { validateSchema } from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import { signInSchema, signUpSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), authController.signUp);
authRouter.post("/", validateSchema(signInSchema), authController.signIn);

export default authRouter;
