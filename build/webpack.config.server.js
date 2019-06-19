const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
// const ExtractPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const isDev = process.env.NODE_ENV === 'development'

// const plugins = [
//   // new MiniCssExtractPlugin({
//   //   filename: 'styles.[contentHash:8].css'
//   // }),
//   new webpack.DefinePlugin({
//     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
//     'process.env.VUE_ENV': '"server"'
//   }),
//   new VueLoaderPlugin()
// ]

// if (isDev) {
//   plugins.push(new VueServerPlugin())
// }

const config = merge(baseConfig,{
      target: 'node',
      entry: path.join(__dirname,'../client/server-entry.js'),
      devtool: 'source-map',
      output: {
       libraryTarget: 'commonjs2',
       filename: 'server-entry.js',
       path: path.join(__dirname, '../server_build')
      },
      externals: Object.keys(require('../package.json').dependencies),
      module:{
        rules:[
          {
            test: /\.styl(us)?$/,
            use:[
              'vue-style-loader',
              'css-loader',
              {
                loader:'postcss-loader',
                options:{
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          }
        ]
      },
      plugins:
          [ new MiniCssExtractPlugin({filename:'styles.[md5:contenthash:hex:20].css'}),
            new webpack.DefinePlugin({
             'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
             'process.env.VUE_ENV': '"server"'
            }),
            new VueServerPlugin()
            // new VueLoaderPlugin()
          ]
  })

module.exports = config
