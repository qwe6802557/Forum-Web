'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"/"',
  BASE_AK: '"BIT-MSA"',
  BASE_MSA_SSO: '"/bit-msa-sso"',
  BASE_MSA_API: '"/bit-msa-pasm-api"',
  BASE_API_VERSION_NAME: '"Bpc-Version"',
  BASE_API_VERSION: '"20210628"'
})
