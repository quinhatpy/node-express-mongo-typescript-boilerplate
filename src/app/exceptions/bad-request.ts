import httpStatus from 'http-status'

import ApplicationError from './app-error'

export default class BadRequest extends ApplicationError {
  constructor(message?: string) {
    super(message || httpStatus[400], httpStatus.BAD_REQUEST)
  }
}
