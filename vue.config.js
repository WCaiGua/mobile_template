const path = require('path')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './', // 设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  lintOnSave: process.env.NODE_ENV !== 'production', // 生产构建时禁用 eslint-loader
  css: {
    loaderOptions: {
      scss: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.sass` 这个文件
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
        additionalData: `@import "@/assets/styles/variable.scss";`,
      },
    },
  },
  chainWebpack: (config) => {
    console.log('当前环境为：' + process.env.NODE_ENV)
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@com', resolve('src/components'))
      .set('@views', resolve('src/assets/views'))
      .set('@css', resolve('src/assets/styles'))
      .set('@img', resolve('src/assets/images'))
  },

}
