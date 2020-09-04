import { objectType } from '@nexus/schema'

export const Human = objectType({
  name: 'Human',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.age()
    t.model.wookies({
      pagination: true,
    })
  },
})
