import Joi from "joi";

export const postSchema = Joi.object({
  text: Joi.string().max(280).required(),
});