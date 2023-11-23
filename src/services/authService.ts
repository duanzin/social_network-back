import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {
  duplicatedEmailError,
  invalidCredentialsError,
  duplicatedUserNameError,
} from "../errors/index";
import authRepository from "../repositories/authRepository";
import { CreateUserParams, SigninParams } from "../protocols/authProtocols";

async function createUser(user: CreateUserParams) {
  const [emailExists, userNameExists] = await Promise.all([
    authRepository.findByEmail(user.email),
    authRepository.findByUserName(user.userName),
  ]);

  if (emailExists) throw duplicatedEmailError();
  if (userNameExists) throw duplicatedUserNameError();

  const slugifiedUserName = user.userName
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();

  const passhash = await bcrypt.hash(user.password, 11);

  await authRepository.create({
    ...user,
    password: passhash,
    slug: slugifiedUserName,
  });
}

async function login({ email, password }: SigninParams): Promise<string> {
  const user = await authRepository.findByEmail(email);
  if (!user) throw invalidCredentialsError();
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) throw invalidCredentialsError();
  const token: string = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 1800,
  });

  return token;
}

export default {
  createUser,
  login,
};
