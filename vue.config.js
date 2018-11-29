const fs = require('fs')
module.exports = {
  baseUrl: './',
  // 打包输出
  outputDir: 'dist',
  // 静态资源存放
  assetsDir: 'assets',
  indexPath: 'index.html',
  // sourceMap
  productionSourceMap: false,
  // 编译警告
  lintOnSave:false,
  // CSS 相关选项
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      // postcss: {
      //   plugins: [
      //     require('postcss-modules')({
      //       getJSON: function(cssFileName, json, outputFileName) {
      //         var path = require('path');
      //         var cssName = path.basename(cssFileName, '.css');
      //         var jsonFileName = path.resolve('./build/' + cssName + '.json');
      //         fs.writeFileSync(jsonFileName, JSON.stringify(json));
      //       }
      //     })
      //   ]
      // }
    },
    modules: false
  },
  // pwa
  pwa: {},
  devServer: {
    open: true,
    host: 'localhost',
    port: 8888,
    https: false,
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    proxy: '', // string | Object
    before: app => { }
  }
}