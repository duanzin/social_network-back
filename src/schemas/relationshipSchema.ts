import Joi from "joi";

export const followUserIdSchema = Joi.object({
  id: Joi.number().required(),
});
