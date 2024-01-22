import Joi from "joi";
import { CreateUserParams, SigninParams } from "../protocols/authProtocols";

export const signUpSchema = Joi.object<CreateUserParams>({
  name: Joi.string().min(1).max(40).required(),
  userName: Joi.string().min(4).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  pfp: Joi.string().uri().optional(),
});

export const signInSchema = Joi.object<SigninParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
