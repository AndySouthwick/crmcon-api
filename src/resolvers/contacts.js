import Contact from "../db/models/contact";
import logger from '../logger'
import jwt from 'jsonwebtoken'
import { salt }from '../secrets'
import { isLoggedIn } from '../utils'


export default {
    Query: {
        async allContacts (_doc, _args, context, _info) {
            try {
                console.log(context)
                const decodedToken = isLoggedIn(context.token)
                const contacts = await Contact.findAll()
                return contacts.map((contacts) => contacts.get({plain: true}))
            }catch (e){
                logger.error(e)
                throw e
            }
        },
        async Contact  (_doc, args, context, _info) {
            try{
                const decodedToken = isLoggedIn(context.token)
                const singleContact = await Contact.findById(args.id)
                return singleContact.get({plain: true})
            }catch (e){
                logger.error(e)
                throw e}
        }
    },
    Mutation: {
        async createContact(_doc, args, _context, _info) {
            try {
                const contact = await Contact.create(args)
               return contact.get({ plain: true })
            } catch (err) {
                logger.error(err)
                throw err
            }
        },
        async updateContact(_doc, args, _context, _info) {
            try {
                const decodedToken = jwt.verify(context.token, salt)
                let contact = await Contact.findById(args.id)
                contact = await contact.update(args)

                return contact.get({ plain: true })
            } catch (err) {
                logger.error(err)
                throw err
            }
        },
        async deleteContact (_doc, args, _context, _info) {
            const decodedToken = jwt.verify(context.token, salt)
            const contact = await Contact.destroy({where: {id: args.id}}).then(() => {
                console.log('Contact deleted')
            })


        },

    }

}