import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import postsService from "../services/postsService";

async function getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await postsService.getPostsFromAll();
      res.status(httpStatus.OK).send(posts);
    } catch (error) {
      next(error);
    }
  }
  
  async function getUserPosts(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    try {
      const posts = await postsService.getPostsFromUser(id);
      res.status(httpStatus.OK).send(posts);
    } catch (error) {
      next(error);
    }
  }
  
  async function createPost(req: Request, res: Response, next: NextFunction) {
    try {
      await postsService.createPost(res.locals.user, req.body);
      res.sendStatus(httpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  }

  export default {
    getAllPosts,
    getUserPosts,
    createPost
  };