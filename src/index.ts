import http from 'http'

import { env } from '@configs'
import logger from '@utils/logger'
import { connectMongoDB } from '@databases/mongo'
import app from '@app'

let appServer: http.Server = null
const serve = () => {
  return app.listen(env.PORT, () => {
    logger.info(`🌏 Express server started at http://localhost:${env.PORT}`)
  })
}

connectMongoDB(() => {
  appServer = serve()
})

const exitHandler = () => {
  if (appServer) {
    appServer.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })

    process.exit(1)
  }
}

const unexpectedErrorHandler = (error: unknown) => {
  logger.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)
