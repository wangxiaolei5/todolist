const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"development"'
        }
       }),
       new HTMLPlugin({
         template: path.join(__dirname,'template.html')
       })
]
const devServer = {
    port: 8080,
    host:'0.0.0.0',
    overlay: {
        error:true
    },
   //open:true,
   hot:true
}
const config = merge(baseConfig,{
      entry: path.join(__dirname,'../practice/index.js'),
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
                    localIdentName:'[hash:base64:5]',
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
      // import
      resolve: {
        alias:{
          'vue':path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
        }
      },
      plugins:defaultPlugins.concat(
          [ new webpack.HotModuleReplacementPlugin()
            // ,new webpack.NoEmitOnErrorsPlugin()
          ])
  })

module.exports = config
