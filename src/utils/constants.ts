export const tokens = {
  access: {
    name: 'ACCESS_TOKEN',
    expiry: '1d',
  },
}

export const APP_SECRET = process.env.APP_SECRET || 'some-secret'

export const isDev = () => process.env.NODE_ENV === 'development'
