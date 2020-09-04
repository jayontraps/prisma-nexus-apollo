import { stringArg, queryField } from '@nexus/schema'

export const allHumans = queryField('allHumans', {
  type: 'Human',
  list: true,
  resolve: async (_parent, _args, ctx) => {
    return ctx.prisma.human.findMany()
  },
})

export const findHuman = queryField('findHuman', {
  type: 'Human',
  list: true,
  args: {
    searchString: stringArg({ nullable: true }),
  },
  resolve: async (_parent, { searchString }, ctx) => {
    const human = await ctx.prisma.human.findMany({
      where: {
        name: {
          contains: searchString || undefined,
        },
      },
    })
    console.log('human ', human)
    return human
  },
})
