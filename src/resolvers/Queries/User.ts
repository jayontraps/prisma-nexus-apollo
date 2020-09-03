import { queryField } from '@nexus/schema'

export const me = queryField('me', {
  type: 'User',
  resolve(_parent, _args, ctx) {
    console.log('ctx.userId: ', ctx.userId)

    return ctx.prisma.user.findOne({
      where: {
        id: ctx.userId,
      },
    })
  },
})
