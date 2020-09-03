import { stringArg, mutationField, intArg } from '@nexus/schema'

export const createDraft = mutationField('createDraft', {
  type: 'Post',
  args: {
    title: stringArg({ nullable: false }),
    content: stringArg(),
    authorEmail: stringArg({ nullable: false }),
  },
  resolve: async (_parent, { title, content, authorEmail }, ctx) => {
    const newPost = await ctx.prisma.post.create({
      data: {
        title,
        content,
        published: false,
        author: {
          connect: { email: authorEmail },
        },
      },
    })

    // ctx.pubsub.publish('latestPost', newPost)
    return newPost
  },
})

export const publish = mutationField('publish', {
  type: 'Post',
  nullable: true,
  args: { id: intArg() },
  resolve: (_parent, { id }, ctx) => {
    return ctx.prisma.post.update({
      where: { id: Number(id) },
      data: { published: true },
    })
  },
})
