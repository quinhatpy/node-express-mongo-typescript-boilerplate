import { NextFunction, Request, Response } from 'express'
import Joi from 'types-joi'

import { ValidateOptions } from '@interfaces/request-validation'
import { getMessageFromJoiError } from '@utils/joi'
import BadRequest from '@exceptions/bad-request'

export const validateRequest = (validateOptions: ValidateOptions) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let validateError: Joi.ValidationError

  if (validateOptions?.validation?.params) {
    const { error } = validateOptions?.validation?.params.validate(req.params)

    if (error) {
      validateError = error
    }
  }

  if (validateOptions?.validation?.query) {
    const { error } = validateOptions?.validation?.query.validate(req.query)

    if (error) {
      validateError = error
    }
  }

  if (validateOptions?.validation?.body) {
    const { error } = validateOptions?.validation?.body.validate(req.body)

    if (error) {
      validateError = error
    }
  }

  if (validateError) {
    throw new BadRequest(getMessageFromJoiError(validateError))
  }

  next()
}
