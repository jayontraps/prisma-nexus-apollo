import { queryField } from '@nexus/schema'

export const allTestTypes = queryField('allTestTypes', {
  type: 'TestType',
  list: true,
  resolve: async (_parent, _args, ctx) => {
    return ctx.prisma.testType.findMany()
  },
})
