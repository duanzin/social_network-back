import { NextFunction, Request, Response } from "express";
import { badRequestError } from "../errors/index";
import { Schema } from "joi";

export function validateSchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) throw badRequestError();

    next();
  };
}
