import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { UserParams } from "../protocols/userProtocols";
import userService from "../services/userService";

async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    let id: number = res.locals.user;
    if (req.params.id) id = parseInt(req.params.id);
    const user: UserParams = await userService.getUser(id);
    res.status(httpStatus.OK).send(user);
  } catch (error) {
    next(error);
  }
}

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users: UserParams[] = await userService.getAllUsers();
    res.status(httpStatus.OK).send(users);
  } catch (error) {
    next(error);
  }
}

async function handleRelationship(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await userService.followOrUnfollow(res.locals.user, req.body.id);
    res.status(httpStatus.OK);
  } catch (error) {
    next(error);
  }
}

export default {
  getAllUsers,
  getUser,
  handleRelationship,
};
