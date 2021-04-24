import { NextFunction, Request } from 'express'
import httpStatus from 'http-status'

import { ResponseEnhance } from '@interfaces/common'
import logger from '@utils/logger'
import AppError from '@exceptions/app-error'

export const errorConverter = (
  appError: AppError,
  req: Request,
  res: ResponseEnhance,
  next: NextFunction,
): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let error: any = appError

  if (!(error instanceof AppError)) {
    const statusCode: number =
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
    // eslint-disable-next-line security/detect-object-injection
    const message: string = error.message || httpStatus[statusCode]
    error = new AppError(message, statusCode, false, appError.stack)
  }

  next(error)
}

export const errorHandler = (
  appError: AppError,
  req: Request,
  res: ResponseEnhance,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void => {
  let { statusCode, message } = appError
  const isProduction = process.env.NODE_ENV === 'production'

  if (isProduction && !appError.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR] as string
  }

  res.locals.errorMessage = appError.message

  const response = {
    message,
    error: !isProduction ? { stack: appError.stack } : {},
  }

  if (process.env.NODE_ENV === 'development') {
    logger.error(appError)
  }

  res.status(statusCode).send(response)
}
