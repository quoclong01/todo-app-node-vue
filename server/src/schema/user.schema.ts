import Joi from "joi";

export default {
  create: Joi.object().keys({
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().min(8).alphanum().required()
  }).required(),
}
