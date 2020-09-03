import { ApolloServer } from 'apollo-server'
import { applyMiddleware } from 'graphql-middleware'
import { permissions } from './permissions'
import { schema } from './schema'
import { createContext } from './context'

export const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: createContext,
  cors: true,
})
