/**
 * 测试环境的配置内容
 */

module.exports = {
  env: 'test',        //环境名称
  port: 3002,         //服务端口号
  // 数据库配置-mysql
  database: {
    DATABASE: 'koas',
    USERNAME: 'opop',
    PASSWORD: '233666',
    PORT: '3306',
    HOST: 'localhost'
  }
}