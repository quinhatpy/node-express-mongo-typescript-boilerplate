import { NextFunction, Request, Response } from 'express'

import logger from '@utils/logger'

const logResponseTime = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const startHrTime = process.hrtime()

  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime)
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6
    const message = `${req.method} ${res.statusCode} ${elapsedTimeInMs}ms\t${req.path}`

    logger.log({
      level: 'info',
      message,
      consoleLoggerOptions: { label: 'API' },
    })
  })

  next()
}

export default logResponseTime
