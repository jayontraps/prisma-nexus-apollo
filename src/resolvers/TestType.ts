import { objectType } from '@nexus/schema'

export const TestType = objectType({
  name: 'TestType',
  definition(t) {
    t.model.id()
    t.model.title()
  },
})
