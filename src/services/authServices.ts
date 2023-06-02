import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { duplicatedEmailError, invalidCredentialsError } from "../errors/index";
import authRepository from "../repositories/authRepository";
import { CreateUserParams, SigninParams } from "../protocols/authProtocols";

export async function createUser({
  name,
  email,
  password,
  pfp,
}: CreateUserParams) {
  const emailExists = await authRepository.findByEmail(email);
  if (emailExists) {
    throw duplicatedEmailError();
  }
  const passhash = await bcrypt.hash(password, 12);

  await authRepository.create({
    name,
    email,
    password: passhash,
    pfp,
  });
}

export async function login({
  email,
  password,
}: SigninParams): Promise<string> {
  const user = await authRepository.findByEmail(email);
  if (!user) throw invalidCredentialsError();
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) throw invalidCredentialsError();
  const id: number = user.id;
  const token: string = jwt.sign({ id }, process.env.JWT_SECRET);

  return token;
}

const authService = {
  createUser,
  login,
};

export default authService;
