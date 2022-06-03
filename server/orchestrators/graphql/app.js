'use strict'

const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')

const tvSeriesSchema = require('./schemas/TVSeriesSchema')
const movieSchema = require('./schemas/MovieSchema')

const typeDefs = gql`
  type Query

  type Mutation
`

const schema = makeExecutableSchema ({
  typeDefs: [typeDefs, tvSeriesSchema.typeDefs, movieSchema.typeDefs],
  resolvers: [tvSeriesSchema.resolvers, movieSchema.resolvers]
})

const server = new ApolloServer({ schema })

server.listen(5010).then(({ url }) => {
  console.log(`GraphQL orchestrator, ${url}`);
})