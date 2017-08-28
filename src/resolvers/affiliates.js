import Affiliate from "../db/models/affiliate";
import logger from '../logger'
import jwt from 'jsonwebtoken'

const salt = "felsjf32rfion32ojeqwdlfk3q2l"
export default {
    Query: {
        async allAffiliates (_doc, _args, _context, _info) {
            try {
                const affiliate = await Affiliate.findAll()
                return affiliate.map((affiliate) => affiliate.get({ plain: true }))
            } catch (err) {
                logger.error(err)
                throw err
            }
        },
        async Affiliate (_doc, args, _context, _info) {
            try {
                // Sequelize has a couple helper methods for finding records
                // .findById just takes one argument - the id of the record
                // .find allows you to specify other fields of a user that you want to lookup by
                const affiliate = await Affiliate.findById(args.id)
                return affiliate.get({ plain: true })
            } catch (err) {
                logger.error(err)
                throw err
            }
        }

    },
    Mutation: {
        async createAffiliate (_doc, args, _context, _info) {
            try {
                const affiliate = await Affiliate.create(args)
                return affiliate.get({ plain: true })
            } catch (err) {
                logger.error(err)
                throw err
            }
        },
        async updateAffiliate (_doc, args, _context, _info) {
            try {
                const affiliate = await Affiliate.update(args)
                return affiliate.get({ plain: true })
            } catch (err) {
                logger.error(err)
                throw err
            }
        },
        async deleteAffiliate (_doc, args, _context, _info) {
                const affiliate = await Affiliate.destroy({where: {id: args.id}}).then(() => {
                   console.log('affiliate deleted')
                })


        },

    }
}