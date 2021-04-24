import { NextFunction, Request } from 'express'
import httpStatus from 'http-status'

import { ResponseEnhance } from '@interfaces/common'
import HttpException from '@exceptions/http-exception'

const checkPermission = (permissions?: string[]) => (
  req: Request,
  res: ResponseEnhance,
  next: NextFunction,
): void => {
  const hasPermission = permissions?.some((permission) =>
    res.locals.user.permissions.includes(permission),
  )

  if (!hasPermission && permissions?.length > 0) {
    throw new HttpException(httpStatus.FORBIDDEN, httpStatus[403])
  }

  next()
}

export default checkPermission
