import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { duplicatedEmailError, invalidCredentialsError } from "../errors/index";
import authRepository from "../repositories/authRepository";
import { CreateUserParams, SigninParams } from "../protocols/authProtocols";
import relationshipRepository from "repositories/relationshipRepository";

async function createUser(user: CreateUserParams) {
  const emailExists = await authRepository.findByEmail(user.email);
  if (emailExists) throw duplicatedEmailError();
  const passhash = await bcrypt.hash(user.password, 11);

  const id: number = await authRepository.create({
    ...user,
    password: passhash,
  });

  await relationshipRepository.follow(id, id);
}

async function login({ email, password }: SigninParams): Promise<string> {
  const user = await authRepository.findByEmail(email);
  if (!user) throw invalidCredentialsError();
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) throw invalidCredentialsError();
  const id: number = user.id;
  const token: string = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 1800,
  });

  return token;
}

export default {
  createUser,
  login,
};
