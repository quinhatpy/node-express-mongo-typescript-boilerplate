import httpStatus from 'http-status'

import { UserLogin } from '@interfaces/auth'
import { Controller } from '@interfaces/route-context'
import { CreateUser, User } from '@interfaces/user'
import * as authService from '@services/auth'

export const signUp: Controller = async (ctx) => {
  const userData: CreateUser = ctx.req.body
  const signUpUserData: User = await authService.signUp(userData)

  ctx.send({
    statusCode: httpStatus.CREATED,
    data: signUpUserData,
    message: httpStatus[201],
  })
}

export const login: Controller = async (ctx) => {
  const userData: UserLogin = ctx.req.body
  const { cookie, user, tokenData } = await authService.login(userData)

  ctx.res.setHeader('Set-Cookie', [cookie])
  ctx.send({
    statusCode: httpStatus.OK,
    data: {
      user,
      token_data: tokenData,
    },
    message: httpStatus[200],
  })
}

export const logout: Controller = async (ctx) => {
  ctx.res.setHeader('Set-Cookie', ['Authorization=; Max-age=0'])

  ctx.send({
    statusCode: httpStatus.NO_CONTENT,
    message: httpStatus[204],
  })
}
