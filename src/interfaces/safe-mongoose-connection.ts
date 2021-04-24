import { ConnectionOptions } from 'mongoose'

/** Callback for establishing or re-stablishing mongo connection */
export type FnOnConnectedCallback = (mongoUrl: string) => void

export interface SafeMongooseConnectionOptions {
  mongoUrl: string
  mongooseConnectionOptions?: ConnectionOptions
  retryDelayMs?: number
  debugCallback?: (
    collectionName: string,
    method: string,
    query: unknown,
    doc: string,
  ) => void
  onStartConnection?: (mongoUrl: string) => void
  onConnectionError?: (error: Error, mongoUrl: string) => void
  onConnectionRetry?: (mongoUrl: string) => void
}
