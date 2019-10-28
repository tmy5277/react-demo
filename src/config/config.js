import produce from 'immer'

const env = process.env.NODE_ENV //todo
// console.log('debug env', env)
let envConfig = {}
if (env === 'development') {
  envConfig = require('./config-local')
}
const config = produce({
  apiBase: '123'
}, nextState => ({
  ...nextState,
  ...envConfig
}))
// console.log('debug config', config)

export default config