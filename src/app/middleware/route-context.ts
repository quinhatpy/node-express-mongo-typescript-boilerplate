import { NextFunction, Request } from 'express'
import httpStatus from 'http-status'

import { ResponseEnhance } from '@interfaces/common'
import { Middleware } from '@interfaces/route'
import { Controller, RouteContext } from '@interfaces/route-context'
import catchAsync from '@utils/catch-async'
import logger from '@utils/logger'
import ConsoleLogger from '@utils/logger/console'

export const makeRouteContext = (controller: Controller): Middleware => {
  return catchAsync(
    async (req: Request, res: ResponseEnhance, next: NextFunction) => {
      const consoleLogger = new ConsoleLogger()
      const ctxInfo = `${req.method} - ${req.url} - ${JSON.stringify(
        req.query,
      )} | ${JSON.stringify(req.body)} | 
        ${JSON.stringify(req.headers)}`

      const ctx: RouteContext = {
        req,
        res,
        next,
        logger: (level = 'info', ...args: any[]) => {
          logger.log({ level, message: ctxInfo, ...args })
        },
        logDebug: (value: unknown, shouldLogContext = false) => {
          if (shouldLogContext) {
            consoleLogger.debug(ctxInfo, value)
          } else {
            consoleLogger.debug(value)
          }
        },
        consoleLogger,
        send: ({
          data,
          message = httpStatus['200'],
          statusCode = httpStatus.OK,
          error,
        }) => {
          return res.status(statusCode).send({
            data,
            message,
            error,
          })
        },
        sendRaw: (data) => res.send(data),
      }

      await controller(ctx)
    },
  )
}
