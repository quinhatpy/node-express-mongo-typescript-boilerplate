import ApplicationError from './app-error'

export default class HttpException extends ApplicationError {
  constructor(status: number, message: string) {
    super(message, status)
  }
}
