import { objectType } from '@nexus/schema'

export const Wookie = objectType({
  name: 'Wookie',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.origin()
    t.model.color()
    t.model.owner()
    t.model.ownerId()
  },
})
