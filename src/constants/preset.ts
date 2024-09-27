export const isProd = process.env.NODE_ENV === 'production'

export const HOME_PATH = isProd ? '/SnapTweak' : '/'
