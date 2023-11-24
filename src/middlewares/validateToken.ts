import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { unauthorizedError } from "../errors/index";
import userRepository from "../repositories/userRepository";

interface JwtPayload {
  id: number;
}

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) throw unauthorizedError();
    const parts: string[] = authorization.split(" ");
    if (parts.length !== 2) throw unauthorizedError();

    const [schema, token] = parts;
    if (schema !== "Bearer") throw unauthorizedError();

    let decoded;
    try {
      decoded = (await jwt.verify(token, process.env.JWT_SECRET)) as JwtPayload;
    } catch (error) {
      throw unauthorizedError();
    }

    if (!decoded.id || isNaN(decoded.id)) throw unauthorizedError();

    const user = await userRepository.findById(decoded.id);
    if (!user) throw unauthorizedError();

    res.locals.user = user.slug;
    next();
  } catch (err) {
    next(err);
  }
}
