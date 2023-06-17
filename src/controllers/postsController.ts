import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import postsService from "../services/postsService";

async function getPosts(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.params.id) {
      const posts = await postsService.getPostsFromUser(
        parseInt(req.params.id)
      );
      res.status(httpStatus.OK).send(posts);
    } else {
      const posts = await postsService.getPostsFromAll();
      res.status(httpStatus.OK).send(posts);
    }
  } catch (error) {
    next(error);
  }
}

async function getPostsFromFollowed(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const posts = await postsService.getFromFollowed(res.locals.user);
    res.status(httpStatus.OK).send(posts);
  } catch (error) {
    next(error);
  }
}

async function createPost(req: Request, res: Response, next: NextFunction) {
  try {
    await postsService.createPost(res.locals.user, req.body.content);
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
}

export default {
  getPosts,
  getPostsFromFollowed,
  createPost,
};
