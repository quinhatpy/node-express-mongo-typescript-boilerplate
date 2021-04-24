import { Request, Response } from 'express'
import httpStatus from 'http-status'

const notFound = (req: Request, res: Response): void => {
  res.status(httpStatus.NOT_FOUND).json({ message: httpStatus['404'] })
}

export default notFound
