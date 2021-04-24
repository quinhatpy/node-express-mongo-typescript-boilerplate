import { Response } from 'express'

import { User } from './user'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ResponseLocals extends Record<string, any> {
  user: User
}

export interface ResponseEnhance extends Response {
  locals: ResponseLocals
}
