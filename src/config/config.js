const env = 'development' //todo
let envConfig = {}
if (env === 'development') {
  envConfig = require('./config-local')
}
const config = Object.assign({
  apiBase: '123'
}, envConfig)
console.log('debug config', config)

export default config