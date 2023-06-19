import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { UserParams } from "../protocols/userProtocols";
import userService from "../services/userService";
import relationshipRepository from "../repositories/relationshipRepository";

async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user: UserParams = await userService.getUser(
      req.params.id !== undefined ? parseInt(req.params.id) : res.locals.user
    );
    if (!req.params.id || parseInt(req.params.id) === res.locals.user)
      user.profileOwner = true;
    res.status(httpStatus.OK).send(user);
  } catch (error) {
    next(error);
  }
}

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.getAllUsers(res.locals.user);
    res.status(httpStatus.OK).send(users);
  } catch (error) {
    next(error);
  }
}

export default {
  getAllUsers,
  getUser,
};
