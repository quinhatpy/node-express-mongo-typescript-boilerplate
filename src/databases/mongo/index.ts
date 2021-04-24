import util from 'util'

import { FnOnConnectedCallback } from '@interfaces/safe-mongoose-connection'
import { MONGODB_CONFIG } from '@configs'
import logger from '@utils/logger'
import SafeMongooseConnection from '@utils/safe-mongoose-connection'

const getMongoAuthentication = () => {
  const hasAuth = MONGODB_CONFIG.DB_USER && MONGODB_CONFIG.DB_PASS

  return hasAuth ? `${MONGODB_CONFIG.DB_USER}:${MONGODB_CONFIG.DB_PASS}@` : ''
}

const debugCallback = (
  collectionName: string,
  method: string,
  query: unknown,
) => {
  if (process.env.NODE_ENV === 'development') {
    const message = `${collectionName}.${method}(${util.inspect(query, {
      colors: true,
      depth: null,
    })})`

    logger.log({
      level: 'silly',
      message,
      consoleLoggerOptions: { label: 'MONGO' },
    })
  }
}

export const connectMongoDB = (
  onConnected: FnOnConnectedCallback,
): SafeMongooseConnection => {
  const auth = getMongoAuthentication()
  const mongoUrl = `mongodb://${auth}${MONGODB_CONFIG.DB_URI}`

  const safeMongooseConnection = new SafeMongooseConnection({
    mongoUrl,
    debugCallback,
    onStartConnection: (mongoUrl) =>
      logger.info(`Connecting to MongoDB at ${mongoUrl}`),
    onConnectionError: (error, mongoUrl) =>
      logger.log({
        level: 'error',
        message: `Could not connect to MongoDB at ${mongoUrl}`,
        error,
      }),
    onConnectionRetry: (mongoUrl) =>
      logger.info(`Retrying to MongoDB at ${mongoUrl}`),
  })

  if (MONGODB_CONFIG.DB_URI) {
    safeMongooseConnection.connect((mongoUrl) => {
      logger.info(`Connected to MongoDB at ${mongoUrl}`)

      onConnected(mongoUrl)
    })
  } else {
    logger.error(
      'MONGODB_CONFIG.DB_URI was wrong. Some MongoDB configs not specified in environment',
    )
    process.exit(1)
  }

  // Close the Mongoose connection, when receiving SIGINT
  process.on('SIGINT', () => {
    // eslint-disable-next-line no-console
    console.log('\n')
    logger.info('Gracefully shutting down')
    logger.info('Closing the MongoDB connection')

    safeMongooseConnection.close((err) => {
      if (err) {
        logger.log({
          level: 'error',
          message: 'Error shutting closing mongo connection',
          error: err,
        })
      } else {
        logger.info('Mongo connection closed successfully')
      }
      process.exit(0)
    }, true)
  })

  return safeMongooseConnection
}
