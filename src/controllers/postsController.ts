import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import postsService from "../services/postsService";
import { badRequestError } from "../errors/index";

async function getPosts(req: Request, res: Response, next: NextFunction) {
  try {
    let posts;
    if (req.params.id !== undefined) {
      if (isNaN(parseInt(req.params.id))) throw badRequestError();
      posts = await postsService.getPostsFromUser(parseInt(req.params.id));
    } else {
      posts = await postsService.getPostsFromAll();
    }
    res.status(httpStatus.OK).send(posts);
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

async function likeOrUnlikePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.params.id === undefined || isNaN(parseInt(req.params.id))) {
      throw badRequestError();
    }
    const postId: number = parseInt(req.params.id);
    await postsService.likeOrUnlike(res.locals.user, postId);
    res.sendStatus(httpStatus.OK);
  } catch (error) {
    next(error);
  }
}

async function retweetPost(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.params.id === undefined || isNaN(parseInt(req.params.id))) {
      throw badRequestError();
    }
    const postId: number = parseInt(req.params.id);
    await postsService.likeOrUnlike(res.locals.user, postId);
    res.sendStatus(httpStatus.OK);
  } catch (error) {
    next(error);
  }
}

export default {
  getPosts,
  getPostsFromFollowed,
  createPost,
  likeOrUnlikePost,
  retweetPost,
};
