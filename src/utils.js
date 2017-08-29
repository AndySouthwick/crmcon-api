import jwt from 'jsonwebtoken'
import { salt } from './secrets'

export const isLoggedIn = (token) => {
  try {
    return jwt.verify(token, salt)
  } catch (e) {
    throw e
  }
}
