export const MONGODB_CONFIG = {
  PORT: process.env.MONGODB_PORT,
  DB_NAME: process.env.MONGODB_NAME,
  DB_USER: process.env.MONGODB_USER,
  DB_PASS: process.env.MONGODB_PASS,
  DB_URI: `${process.env.MONGODB_HOSTNAME}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`,
}

export const MONGODB_OPTIONS = {
  autoIndex: false,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  poolSize: parseInt(process.env.MONGODB_MAX_POOL_SIZE, 10) || 50,
}
