import Joi from 'types-joi'

export interface ValidateOptions {
  validation?: {
    params?: Joi.ObjectSchema<unknown>
    query?: Joi.ObjectSchema<unknown>
    body?: Joi.ObjectSchema<unknown>
  }
}
