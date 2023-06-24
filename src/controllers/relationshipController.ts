import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import relationshipRepository from "../repositories/relationshipRepository";
import relationshipService from "../services/relationshipService";
import { badRequestError } from "../errors/index";

async function handleRelationship(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const relationship = await relationshipService.followOrUnfollow(
      res.locals.user,
      parseInt(req.body.id)
    );
    res.status(httpStatus.OK).send({ relationship: relationship });
  } catch (error) {
    next(error);
  }
}

async function getRelationship(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (isNaN(parseInt(req.params.id))) throw badRequestError();
    const followedId: number = parseInt(req.params.id);
    const relationship = await relationshipRepository.findRelationship(
      res.locals.user,
      followedId
    );
    if (relationship)
      res.status(httpStatus.OK).send({ relationship: relationship.id });
    res.status(httpStatus.OK).send({ relationship: null });
  } catch (error) {
    next(error);
  }
}

export default {
  handleRelationship,
  getRelationship,
};
