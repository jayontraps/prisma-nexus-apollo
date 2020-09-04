import { stringArg, mutationField, intArg } from '@nexus/schema'

export const createHuman = mutationField('createHuman', {
  type: 'Human',
  args: {
    name: stringArg({ required: true }),
    age: intArg(),
  },
  resolve: async (_parent, { name, age }, ctx) => {
    const newHuman = await ctx.prisma.human.create({
      data: {
        name,
        age,
      },
    })
    return newHuman
  },
})
