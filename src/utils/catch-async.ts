import { NextFunction, Request } from 'express'

import { ResponseEnhance } from '@interfaces/common'
import { Middleware } from '@interfaces/route'

const catchAsync = (fn: Middleware) => (
  req: Request,
  res: ResponseEnhance,
  next: NextFunction,
): void => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err))
}

export default catchAsync
