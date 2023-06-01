import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { unauthorizedError } from "../errors/index";

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) throw unauthorizedError();

  const parts: string[] = authorization.split(" ");
  if (parts.length !== 2) throw unauthorizedError();

  const [schema, token] = parts;
  if (schema !== "Bearer") throw unauthorizedError();

  jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
    try {
      if (error !== null) throw unauthorizedError();

      const {
        rows: [user],
      } = await userRepository.findById(decoded.id);

      if (!user) throw unauthorizedError();

      res.locals.user = user;
      next();
    } catch (err) {
      next(err);
    }
  });
}
