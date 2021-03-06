import { Request, Response } from 'express'
import morgan from 'morgan'

import logger from '@utils/logger'

morgan.token(
  'message',
  (req: Request, res: Response) => res.locals.errorMessage || '',
)

const getIpFormat = () => {
  return process.env.NODE_ENV === 'production' ? ':remote-addr - ' : ''
}

const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`

export const successHandler = morgan(successResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: {
    write: (message) => logger.info(message.trim()),
  },
})

export const errorHandler = morgan(errorResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: {
    write: (message) => logger.error(message.trim()),
  },
})
