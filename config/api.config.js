const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV)

module.exports = {
  baseUrl: IS_PROD ? '' : '/api'
}
