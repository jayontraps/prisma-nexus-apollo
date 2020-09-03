import { PrismaClient } from '@prisma/client'
import { PubSub } from 'apollo-server'
import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { APP_SECRET, tokens } from './utils/constants'

const prisma = new PrismaClient()
const pubsub = new PubSub()

export interface Context {
  prisma: PrismaClient
  req: Request
  res: Response
  pubsub: PubSub
  userId: number
}

export interface Token {
  userId: number
  type: string
  timestamp: number
}

export function createContext(ctx: any): Context {
  let userId: number
  try {
    let Authorization = ''
    try {
      // for queries and mutations
      Authorization = ctx.req.get('Authorization')
    } catch (e) {
      // specifically for subscriptions as the above will fail
      Authorization = ctx?.connection?.context?.Authorization
    }
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, APP_SECRET) as Token

    if (!verifiedToken.userId && verifiedToken.type !== tokens.access.name)
      userId = -1
    else userId = verifiedToken.userId
  } catch (e) {
    userId = -1
  }
  return {
    ...ctx,
    prisma,
    pubsub,
    userId,
  }
}
