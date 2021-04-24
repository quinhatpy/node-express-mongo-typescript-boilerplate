import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import _isEmpty from 'lodash/isEmpty'

import { CreateUser, IUserModel, UpdateUser, User } from '@interfaces/user'
import HttpException from '@exceptions/http-exception'
import UserModel from '@models/user'

export const findAllUser = async (): Promise<User[]> => {
  const users: IUserModel[] = await UserModel.find()

  return users
}

export const findUserById = async (userId: string): Promise<User> => {
  if (!userId) {
    throw new HttpException(httpStatus.BAD_REQUEST, "You're not userId")
  }

  const user: IUserModel = await UserModel.findOne({ _id: userId })
  if (!user) {
    throw new HttpException(httpStatus.NOT_FOUND, "You're not user")
  }

  return user
}

export const createUser = async (userData: CreateUser): Promise<User> => {
  if (_isEmpty(userData)) {
    throw new HttpException(httpStatus.BAD_REQUEST, "You're not userData")
  }

  const existedUser: IUserModel = await UserModel.findOne({
    email: userData.email,
  })
  if (existedUser) {
    throw new HttpException(
      httpStatus.CONFLICT,
      `You're email ${userData.email} already exists`,
    )
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10)
  const createUserData: IUserModel = await UserModel.create({
    ...userData,
    password: hashedPassword,
  })

  return createUserData
}

export const updateUser = async (
  userId: string,
  userData: UpdateUser,
): Promise<User> => {
  if (_isEmpty(userData)) {
    throw new HttpException(httpStatus.BAD_REQUEST, "You're not userData")
  }

  const { email, ...userDataUpdate } = userData

  if (email) {
    const existedUser: IUserModel = await UserModel.findOne({
      email,
    })
    if (existedUser && existedUser._id !== userId) {
      throw new HttpException(
        httpStatus.CONFLICT,
        `You're email ${email} already exists`,
      )
    }
  }

  if (userData.password) {
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    userData = { ...userData, password: hashedPassword }
  }

  const updateUserById: IUserModel = await UserModel.findByIdAndUpdate(
    userId,
    userDataUpdate,
    { new: true },
  )
  if (!updateUserById) {
    throw new HttpException(httpStatus.NOT_FOUND, "You're not user")
  }

  return updateUserById
}

export const deleteUser = async (userId: string): Promise<User> => {
  const deleteUserById: IUserModel = await UserModel.findByIdAndDelete(userId)
  if (!deleteUserById) {
    throw new HttpException(httpStatus.NOT_FOUND, "You're not user")
  }

  return deleteUserById
}
