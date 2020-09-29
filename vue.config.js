module.exports = {
  publicPath: '',
  assetsDir: 'static',
  productionSourceMap: false,
  outputDir: 'dist/admin',

  devServer: {
    port: 9999,
    proxy: null, // 设置代理
  }
}
