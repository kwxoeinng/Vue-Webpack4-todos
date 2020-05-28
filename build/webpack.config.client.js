const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development'
const defaultPlugin = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLWebpackPlugin({
        template: path.join(__dirname, '../index.html')
    }),
]
let config
const devServer = {
    // 项目构建后路径
    contentBase: './dist',
    // 启动 gzip 压缩
    compress: true,
    // 端口号
    port: 8080,
    // 自动打开浏览器
    open: true,
    hot: true
}
if (isDev) {
    config = merge(baseConfig, {
      devtool: '#cheap-module-eval-source-map',
      devServer,
      plugins: defaultPlugin.concat([
      // 启动热更新功能插件
      new webpack.HotModuleReplacementPlugin(),
      // 帮助减少不需要的信息展示
      new webpack.NoEmitOnErrorsPlugin()
      ])
    })
  } else {
    config = merge(baseConfig, {
      plugins: defaultPlugin.concat([
        // 提取css成单独文件
        new MiniCssExtractPlugin({
          filename: 'css/built.css'
        }),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin()
      ])
    })
  }
  module.exports = config
  