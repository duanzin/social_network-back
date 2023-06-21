import Joi from "joi";
import { CreateUserParams, SigninParams } from "../protocols/authProtocols";

export const signUpSchema = Joi.object<CreateUserParams>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  pfp: Joi.string().uri().optional(),
});

export const signInSchema = Joi.object<SigninParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
