const devConfig = require('./webpack.dev.config')
const buildConfig = require('./webpack.build.config')

const ENV_DEV = process.env.NODE_ENV === 'development'
const config = ENV_DEV ? devConfig : buildConfig

module.exports = config