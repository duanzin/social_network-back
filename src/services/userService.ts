import userRepository from "../repositories/userRepository";
import { notFoundError } from "../errors/index";
import { UserParams } from "../protocols/userProtocols";

async function getUser(id: number): Promise<UserParams> {
  const user = await userRepository.findById(id);
  if(!user) throw notFoundError();
  return user;
}

async function getAllUsers(): Promise<UserParams[]> {
  return await userRepository.findAll();
}

export default {
  getUser,
  getAllUsers
};