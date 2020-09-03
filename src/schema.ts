import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import { makeSchema, objectType } from '@nexus/schema'
import * as allTypes from './resolvers'
import { Context } from './context'

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.post()
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'signupUser' })
    t.crud.deleteOnePost()
  },
})

const nexusPrisma = nexusSchemaPrisma({
  experimentalCRUD: true,
  paginationStrategy: 'prisma',
  prismaClient: (ctx: Context) => ctx.prisma,
})

export const schema = makeSchema({
  types: [Query, Mutation, allTypes],
  plugins: [nexusPrisma],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'ctx.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'ctx',
      },
    ],
  },
})
