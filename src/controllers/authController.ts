import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import authService from "../services/authService";

async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    await authService.createUser(req.body);
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
}

async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const token = await authService.login(req.body);
    res.status(httpStatus.OK).send({ token: token });
  } catch (error) {
    next(error);
  }
}

export default {
  signIn,
  signUp,
};
