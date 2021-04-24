import Joi from 'types-joi'

export const createUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.string()),
})

export const updateUserSchema = Joi.object().keys({
  email: Joi.string().email().optional(),
  password: Joi.string(),
  name: Joi.string(),
  permissions: Joi.array().items(Joi.string()),
})

export const getUserSchema = Joi.object().keys({
  id: Joi.string().required(),
})
