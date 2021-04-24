import { cleanEnv, num, port, str } from 'envalid'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  PORT: port({ default: 3000 }),
  TZ: str(),
  JWT_SECRET: str(),
  JWT_ACCESS_EXPIRATION_SECOND: num(),
  MONGODB_PORT: port({ default: 27017 }),
  MONGODB_NAME: str(),
  MONGODB_USER: str({ default: '' }),
  MONGODB_PASS: str({ default: '' }),
  MONGODB_HOSTNAME: str({ default: 'localhost' }),
  MONGODB_MAX_POOL_SIZE: num({ default: 50 }),
})
