import { NextFunction, Request } from 'express'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'

import { DataStoredInToken } from '@interfaces/auth'
import { ResponseEnhance } from '@interfaces/common'
import { JWT_CONFIG } from '@configs'
import HttpException from '@exceptions/http-exception'
import UserModel from '@models/user'

const checkAuth = async (
  req: Request,
  res: ResponseEnhance,
  next: NextFunction,
): Promise<void> => {
  try {
    const authorization =
      req.cookies.Authorization ||
      req.header('Authorization').split('Bearer ')[1] ||
      null

    if (authorization) {
      const verificationResponse = (await jwt.verify(
        authorization,
        JWT_CONFIG.SECRET_KEY,
      )) as DataStoredInToken
      const userId = verificationResponse._id
      const user = await UserModel.findById(userId)

      if (user) {
        res.locals.user = user
        next()
      } else {
        next(
          new HttpException(
            httpStatus.UNAUTHORIZED,
            'Wrong authentication token',
          ),
        )
      }
    } else {
      next(
        new HttpException(httpStatus.NOT_FOUND, 'Authentication token missing'),
      )
    }
  } catch (error) {
    next(
      new HttpException(httpStatus.UNAUTHORIZED, 'Wrong authentication token'),
    )
  }
}

export default checkAuth
