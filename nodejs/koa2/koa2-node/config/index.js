var development_env = require('./development');
var production_env = require('./production')
var test_env = require('./test');

//根据不同的NODE_ENV，输出不同的配置对象，默认输出development的配置对象
var env = process.env.NODE_ENV || 'development'

// 根据环境的不同返回不同的配置信息
var env_config = {
    development: development_env,
    production: production_env,
    test: test_env
}[env]

module.exports = env_config