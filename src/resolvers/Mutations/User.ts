import { mutationField, stringArg } from '@nexus/schema'
import { compare, hash } from 'bcrypt'
import { generateAccessToken, handleError } from '../../utils/helpers'
import { errors } from '../../utils/errors'

export const signup = mutationField('signup', {
  type: 'AuthPayload',
  args: {
    name: stringArg(),
    email: stringArg({ required: true }),
    password: stringArg({ required: true }),
  },
  resolve: async (_parent, { name, email, password }, ctx) => {
    try {
      const hashedPassword = await hash(password, 10)
      const user = await ctx.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      })

      const accessToken = generateAccessToken(user.id)
      return {
        accessToken,
        user,
      }
    } catch (e) {
      handleError(errors.userAlreadyExists)
    }
  },
})

export const login = mutationField('login', {
  type: 'AuthPayload',
  args: {
    email: stringArg({ required: true }),
    password: stringArg({ required: true }),
  },
  resolve: async (_parent, { email, password }, ctx) => {
    let user = null
    try {
      user = await ctx.prisma.user.findOne({
        where: {
          email,
        },
      })
    } catch (e) {
      handleError(errors.invalidUser)
    }

    if (!user) handleError(errors.invalidUser)
    let accessToken = ''
    if (user) {
      const passwordValid = await compare(password, user.password)
      if (!passwordValid) handleError(errors.invalidUser)
      accessToken = generateAccessToken(user.id)
    }

    ctx.res.cookie('token', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    })

    return {
      accessToken,
      user,
    }
  },
})
