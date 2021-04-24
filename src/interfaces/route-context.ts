import { NextFunction, Request } from 'express'

import ConsoleLogger from '@utils/logger/console'

import { ResponseEnhance } from './common'

type FnRouteLogger = (...data: any[]) => void

type FnRouteConsoleLogger = ConsoleLogger

type FnLogDebug = (...data: any[]) => void

interface RouteSendParams {
  data?: unknown
  message?: string
  statusCode?: number
  error?: unknown
}

type FnRouteSend = (data: RouteSendParams) => void

type FnRouteSendRaw = (data: unknown) => void

export interface RouteContext {
  req: Request
  res: ResponseEnhance
  next: NextFunction
  logger: FnRouteLogger
  consoleLogger: FnRouteConsoleLogger
  logDebug: FnLogDebug
  send: FnRouteSend
  sendRaw: FnRouteSendRaw
}

export type Controller = (ctx: RouteContext) => Promise<void>
