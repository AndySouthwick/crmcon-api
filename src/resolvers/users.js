import User from '../db/models/user'
import logger from '../logger'
import jwt from 'jsonwebtoken'
import hash from 'password-hash'
import { salt } from '../secrets'
import { isLoggedIn } from '../utils'

/*
  The biggest thing to remember when utilizing sequelize is to get the PLAIN js object out
  of the fancy model class wrapper. This way graphql knows what to do with it.
 */

export default {
  Query: {
    async allUsers (_doc, _args, _context, _info) {
      try {
        const users = await User.findAll()
        return users.map((user) => user.get({plain: true}))
      } catch (err) {
        logger.error(err)
        throw err
      }
    },

    async User (_doc, args, _context, _info) {
      try {
        // Sequelize has a couple helper methods for finding records
        // .findById just takes one argument - the id of the record
        // .find allows you to specify other fields of a user that you want to lookup by
        const user = await User.findById(args.id)
        return user.get({plain: true})
      } catch (err) {
        logger.error(err)
        throw err
      }
    },

    async loggedInUser (_doc, args, context, _info) {
      try {
        const token = isLoggedIn(context.token)
        const user = await User.findById(token.data.id)
        return user.get({plain: true})
      } catch (err) {
        logger.error(err)
        throw err
      }
    }
  },

  Mutation: {
    async createUser (_doc, args, _context, _info) {
      try {
        const user = await User.create(args)
        return user.get({plain: true})
      } catch (err) {
        logger.error(err)
        throw err
      }
    },

    async updateUser (_doc, args, _context, _info) {
      try {
        let user = await User.findById(args.id)
        user = await user.update(args)

        return user.get({plain: true})
      } catch (err) {
        logger.error(err)
        throw err
      }

    },

    async loginUser (_doc, args, _context, _info) {
      try {
        let foundUser = await User.findOne({
          where: {
            email: args.email
          }
        })

        if (!foundUser) {
          console.log(`Couldn't find user`)
          return {token: null}
        }

        foundUser = foundUser.get({plain: true})

        console.log(args.password, foundUser.hashedPassword)

        if (hash.verify(args.password, foundUser.hashedPassword)) {
          console.log(`Passwords matched`)
          delete foundUser.hashedPassword
          return {
            token: jwt.sign({
              exp: Math.floor(Date.now() / 1000) + (60 * 60),
              data: foundUser
            }, salt)
          }
        }

        console.log(`Passwords didn't match`)

        return {token: null}
      } catch (e) {
        throw e
      }
    }
  }
}
