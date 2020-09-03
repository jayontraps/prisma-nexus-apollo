import { stringArg, queryField, intArg } from '@nexus/schema'

export const feed = queryField('feed', {
  type: 'Post',
  list: true,
  resolve: async (_parent, _args, ctx) => {
    // run a test
    const test = await ctx.prisma.user.findOne({
      where: {
        id: 1,
      },
    })

    console.log('test: ', test)

    return ctx.prisma.post.findMany({
      where: { published: true },
    })
  },
})

export const filterPosts = queryField('filterPosts', {
  type: 'Post',
  list: true,
  args: {
    searchString: stringArg({ nullable: true }),
  },
  resolve: (_parent, { searchString }, ctx) => {
    return ctx.prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchString || undefined,
            },
          },
          {
            content: {
              contains: searchString,
            },
          },
        ],
      },
    })
  },
})
