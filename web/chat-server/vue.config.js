const { defineConfig } = require('@vue/cli-service')
const fs = require('fs')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: '127.0.0.1',  // 使用 127.0.0.1，与后端和证书保持一致
    // 此处开启 https,并加载本地证书（否则浏览器左上角会提示不安全）
    https: {
      // Win10本地部署
      cert: fs.readFileSync(path.join(__dirname, 'src/assets/cert/127.0.0.1+2.pem')),
      key: fs.readFileSync(path.join(__dirname, 'src/assets/cert/127.0.0.1+2-key.pem')),
      // Ubuntu22.04云服务器部署
      // cert: fs.readFileSync(path.join("/etc/ssl/certs/server.crt")),
      // key: fs.readFileSync(path.join("/etc/ssl/private/server.key")),
    },
    // 本地开发使用 8080 端口，避免需要管理员权限
    port: 8080,
  }
  // devServer: {
  //   host: '0.0.0.0',
  //   // 端口设为常见的开发用端口，避免与服务器默认的 HTTPS 端口冲突
  //   port: 8080,
  // }
})
