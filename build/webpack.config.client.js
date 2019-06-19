const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge')
// const { VueLoaderPlugin } = require('vue-loader');
// const ExtractPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development'
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
       }),
    new HTMLPlugin({
         template: path.join(__dirname, 'template.html')
       }),
    new VueClientPlugin()
    // new VueLoaderPlugin()
]
const devServer = {
    port: 8000,
    host:'0.0.0.0',
    overlay: {
        error:true
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: {
       index:'/public/index.html'
    },
   //open:true,
   hot:true
}
let config
if (isDev) {
    config = merge(baseConfig,{
        mode:'development',
        devtool:'#cheap-module-eval-source-map',
        module:{
          rules:[
            {
                test:/\.styl(us)?$/,
                use:[
                 'vue-style-loader',
                 {
                   loader: 'css-loader',
                   options: {
                     localIdentName:'[local]_[hash:base64:5]',
                     sourceMap: true
                   }
                 },
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
        devServer,
        plugins:defaultPlugins.concat(
            [ new webpack.HotModuleReplacementPlugin()
              // ,new webpack.NoEmitOnErrorsPlugin()
            ])
    })
} else {
  config = merge(baseConfig, {
    mode:'production',
    entry:{
      app: path.join(__dirname,'../client/client-entry.js'),
      vendor:['vue']
    },
    output:{
      filename:'[name].[chunkhash:8].js',
      publicPath:'/public/'
    },
    module:{
      rules:[
        {
          test: /\.styl(us)?$/,
          use:[
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader:'postcss-loader',
              options:{
                modules: true,
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
       ]
    },
    optimization: {
      splitChunks: {
        chunks:'all'
      },
      runtimeChunk: true
    },
    plugins:defaultPlugins.concat(
        [  new MiniCssExtractPlugin({filename:'styles.[md5:contenthash:hex:20].css'}),
          // ,new webpack.optimize.CommonsChunkPlugin({
          //     name:'vendor'
          //   }),
          // new webpack.optimize.CommonsChunkPlugin({
          //   name:'runtime'
          // })
      ])
  })
}

module.exports = config
