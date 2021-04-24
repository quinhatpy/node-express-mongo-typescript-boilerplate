import Joi from 'types-joi'

export const getMessageFromJoiError = (
  error: Joi.ValidationError,
): string | undefined => {
  if (!error.details && error.message) {
    return error.message
  }

  const errorMessage = error?.details
    ?.map((errorDetail) => {
      return errorDetail.message
    })
    ?.join(', ')

  return errorMessage
}
