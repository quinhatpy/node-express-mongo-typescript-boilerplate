import { NextFunction, Request } from 'express'

import { Method } from '@constants/enum'

import { ResponseEnhance } from './common'
import { Controller } from './route-context'

export type Middleware = (
  req: Request,
  res: ResponseEnhance,
  next: NextFunction,
) => void

export interface RouteConfig {
  method: Method
  path: string
  controller: Controller
  middleware?: Middleware[]
  auth?: boolean
  permissions?: string[]
  version?: string
}
