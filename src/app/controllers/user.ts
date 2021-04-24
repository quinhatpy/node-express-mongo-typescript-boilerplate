import httpStatus from 'http-status'

import { Controller } from '@interfaces/route-context'
import { CreateUser, UpdateUser, User } from '@interfaces/user'
import * as userService from '@services/user'

export const getUsers: Controller = async (ctx) => {
  const users: User[] = await userService.findAllUser()

  ctx.send({
    statusCode: httpStatus.OK,
    data: users,
    message: httpStatus[200],
  })
}

export const getUserById: Controller = async (ctx) => {
  const userId: string = ctx.req.params.id
  const user: User = await userService.findUserById(userId)

  ctx.send({
    statusCode: httpStatus.OK,
    data: user,
    message: httpStatus[200],
  })
}

export const createUser: Controller = async (ctx) => {
  const userData: CreateUser = ctx.req.body
  const createUserData: User = await userService.createUser(userData)

  ctx.send({
    statusCode: httpStatus.CREATED,
    data: createUserData,
    message: httpStatus[201],
  })
}

export const updateUser: Controller = async (ctx) => {
  const userId: string = ctx.req.params.id
  const userData: UpdateUser = ctx.req.body
  const updateUserData: User = await userService.updateUser(userId, userData)

  ctx.send({
    statusCode: httpStatus.OK,
    data: updateUserData,
    message: httpStatus[200],
  })
}

export const deleteUser: Controller = async (ctx) => {
  const userId: string = ctx.req.params.id
  const deleteUserData: User = await userService.deleteUser(userId)

  ctx.send({
    statusCode: httpStatus.OK,
    data: deleteUserData,
    message: httpStatus[200],
  })
}
