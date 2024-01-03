import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { UserParams } from "../protocols/userProtocols";
import userService from "../services/userService";
import { badRequestError } from "../errors/index";

async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const slugOrId: string = req.params.slug || res.locals.user;
    if (req.params.slug && typeof slugOrId !== "string") {
      throw badRequestError();
    }
    const user: UserParams = await userService.getUser(slugOrId);

    user.profileOwner = !req.params.slug || slugOrId === res.locals.user;

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
