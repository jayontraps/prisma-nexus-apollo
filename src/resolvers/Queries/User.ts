import { queryField } from '@nexus/schema'

export const me = queryField('me', {
  type: 'User',
  resolve: async (_parent, _args, ctx) => {
    console.log('ctx.userId: ', ctx.userId)
    const me = await ctx.prisma.user.findOne({
      where: {
        id: ctx.userId,
      },
    })
    return me
  },
})
