import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import expressMongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'

import apiRoutes from '@routes/api'
import * as handleError from '@middleware/handle-error'
import logResponseTime from '@middleware/log-response-time'
import * as morgan from '@middleware/morgan'
import notFound from '@middleware/not-found'
import { authLimiter } from '@middleware/rate-limiter'

const app = express()

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan.successHandler)
  app.use(morgan.errorHandler)
}
// app.use(logResponseTime)

// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
app.use(expressMongoSanitize())

// gzip compression
app.use(compression())

// enable cors
app.use(cors())
app.options('*', cors())

// cookie
app.use(cookieParser())

// limit repeated failed requests to auth endpoints
if (process.env.NODE_ENV === 'production') {
  app.use('/auth', authLimiter)
}

app.use(apiRoutes)

// convert error to AppError, if needed
app.use(handleError.errorConverter)

// handle error
app.use(handleError.errorHandler)

// send back a 404 error for any unknown api request
app.use(notFound)

export default app
