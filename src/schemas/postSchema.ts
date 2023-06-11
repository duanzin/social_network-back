import Joi from "joi";

export const postSchema = Joi.object({
  content: Joi.string().max(150).required(),
});