import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import _isEmpty from 'lodash/isEmpty'

import { DataStoredInToken, TokenData, UserLogin } from '@interfaces/auth'
import { CreateUser, IUserModel, User } from '@interfaces/user'
import { JWT_CONFIG } from '@configs'
import HttpException from '@exceptions/http-exception'
import UserModel from '@models/user'

export const signUp = async (userData: CreateUser): Promise<User> => {
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

export const login = async (
  userData: UserLogin,
): Promise<{ cookie: string; user: User; tokenData: TokenData }> => {
  if (_isEmpty(userData)) {
    throw new HttpException(httpStatus.BAD_REQUEST, "You're not userData")
  }

  const user: User = await UserModel.findOne({ email: userData.email })
  if (!user) {
    throw new HttpException(
      httpStatus.NOT_FOUND,
      `You're email or password not matching`,
    )
  }

  const isPasswordMatching: boolean = await bcrypt.compare(
    userData.password,
    user.password,
  )
  if (!isPasswordMatching) {
    throw new HttpException(
      httpStatus.NOT_FOUND,
      `You're email or password not matching`,
    )
  }

  const tokenData = createToken(user)
  const cookie = createCookie(tokenData)

  return {
    cookie,
    user,
    tokenData,
  }
}

export const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = {
    _id: user._id,
  }
  const now = new Date().getTime()
  const expiresAt = now + JWT_CONFIG.ACCESS_EXPIRES_IN * 1000

  return {
    expiresIn: JWT_CONFIG.ACCESS_EXPIRES_IN,
    expiresAt,
    token: jwt.sign(dataStoredInToken, JWT_CONFIG.SECRET_KEY, {
      expiresIn: JWT_CONFIG.ACCESS_EXPIRES_IN,
      algorithm: JWT_CONFIG.ALGORITHM,
    }),
  }
}

export const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`
}
