import { InterfaceFrom } from 'types-joi'

import { loginSchema } from '@request/auth'

export interface DataStoredInToken {
  _id: string
}

export interface TokenData {
  token: string
  expiresIn: number
  expiresAt: number
}

export type UserLogin = InterfaceFrom<typeof loginSchema>
