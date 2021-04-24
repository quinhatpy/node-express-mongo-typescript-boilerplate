import httpStatus from 'http-status'

class AppError extends Error {
  public message = 'Application Error'
  public statusCode: number = httpStatus.INTERNAL_SERVER_ERROR
  public isOperational = true

  constructor(
    message?: string,
    statusCode?: number,
    isOperational = true,
    stack = '',
  ) {
    super(message)

    if (message != null) {
      this.message = message
    }
    if (statusCode != null) {
      this.statusCode = statusCode
    }

    this.isOperational = !!isOperational

    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export default AppError
