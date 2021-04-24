import { Document } from 'mongoose'
import { InterfaceFrom } from 'types-joi'

import { createUserSchema, updateUserSchema } from '@request/user'

export type User = {
  _id: string
  name: string
  email: string
  password: string
  permissions: string[]
}

export type IUserModel = User & Document

export type CreateUser = InterfaceFrom<typeof createUserSchema>

export type UpdateUser = InterfaceFrom<typeof updateUserSchema>
