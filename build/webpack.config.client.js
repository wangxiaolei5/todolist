const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge')
// const { VueLoaderPlugin } = require('vue-loader');
const ExtractPlugin = require('extract-text-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const baseConfig = require('./webpack.config.base')
const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"' 
        }
       }),
       new HTMLPlugin()
]
const devServer = {
    port: 8000,
    host:'0.0.0.0',
    overlay: {
        error:true
    },
   //open:true,
   hot:true
  }
let config
if (isDev) {
    config = merge(baseConfig,{
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
                     module: true,
                     localIdentName:isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
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
            [ new webpack.HotModuleReplacementPlugin(),
              new webpack.NoEmitOnErrorsPlugin()])
    })
} else {
  config = merge(baseConfig, {
    entry:{
      app: path.join(__dirname,'../client/index.js'),
      vendor:['vue']
    },
    output:{
      filename:'[name].[chunkhash:8].js'  
    },
    module:{
      rules:[
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback:'vue-style-loader',
            use:[
             'css-loader',
             {
               loader:'postcss-loader',
               options:{
                 sourceMap: true  
               }  
             },
             'stylus-loader'
            ]
          })
        }
       ]   
    },
    plugins:defaultPlugins.concat(
        [  new ExtractPlugin('styles.[contentHash:8].css'),
           new webpack.optimize.CommonsChunkPlugin({
            name:'vendor'
           }),
          new webpack.optimize.CommonsChunkPlugin({
           name:'runtime'
          })
      ])
  })  
}

module.exports = config