import { stringArg, mutationField, intArg } from '@nexus/schema'

export const createWookie = mutationField('createWookie', {
  type: 'Wookie',
  args: {
    name: stringArg({ nullable: false }),
    color: stringArg({ nullable: false }),
    origin: stringArg({ nullable: false }),
    ownerName: stringArg({ nullable: false }),
  },
  resolve: async (_parent, { name, color, origin, ownerName }, ctx) => {
    const newWookie = await ctx.prisma.wookie.create({
      data: {
        name,
        color,
        origin,
        owner: {
          connect: {
            name: ownerName,
          },
        },
      },
    })
    console.log('newWookie: ', newWookie)

    return newWookie
  },
})
