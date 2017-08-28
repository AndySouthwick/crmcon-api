import express from 'express'
import bodyParser from 'body-parser'
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express'
import {makeExecutableSchema }from 'graphql-tools'
import schemaDef from './schema.graphqls'
import resolvers from './resolvers'
import db from './db'
import cors from 'cors'

const app = express()

 const schema = makeExecutableSchema({
        resolvers,
         typeDefs: [schemaDef]
     })

app.use(cors())

app.use('/graphql', bodyParser.json(), graphqlExpress((req) => ({
    schema,
    context: { token: req.header('authorization')}
})))

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}))

db.authenticate()
    .then(() => {
        app.listen(3000, () => {
            console.log('server is running on port 3000')
        })
    })
    .catch((err) => {
    console.error(err)
})


