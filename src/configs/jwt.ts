import { Algorithm } from 'jsonwebtoken'

export const JWT_CONFIG = {
  SECRET_KEY: process.env.JWT_SECRET,
  ALGORITHM: 'HS256' as Algorithm,
  ACCESS_EXPIRES_IN: parseInt(process.env.JWT_ACCESS_EXPIRATION_SECOND, 10),
}
