import * as Posts from './Post'
import * as Users from './User'
import * as Humans from './Human'
import * as Wookies from './Wookie'

export const Mutation = {
  ...Posts,
  ...Users,
  ...Humans,
  ...Wookies,
}
