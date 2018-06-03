/**
 * 生产环境配置内容
 */
module.exports = {
  env: 'production', //环境名称
  port: 3001,         //服务端口号
  // 数据库配置-mysql
  database: {
    DATABASE: 'koas',
    USERNAME: 'opop',
    PASSWORD: '233666',
    PORT: '3306',
    HOST: 'localhost'
  }
}