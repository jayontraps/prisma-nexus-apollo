import { AuthPayload } from './AuthPayload'
import { Mutation } from './Mutations'
// import { Subscription } from './Subscriptions'
import { Post } from './Post'
import { Query } from './Queries'
import { User } from './User'
import { TestType } from './TestType'
import { Human } from './Human'
import { Wookie } from './Wookie'

export const resolvers = {
  User,
  Post,
  AuthPayload,
  Query,
  Mutation,
  TestType,
  Human,
  Wookie,
  // Subscription,
}
