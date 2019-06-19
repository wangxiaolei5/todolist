const path = require('path');
// const createvueLoaderOptions = require('./vue-loader.config.js')
const VueLoaderPlugin  = require('vue-loader/lib/plugin');
// const isDev = process.env.NODE_ENV === 'development'
const config = {
    mode: process.env.NODE_ENV || 'production',
    target: 'web',
    entry: path.join(__dirname, '../client/client-entry.js'),
    output: {
      filename: 'bundle.[hash:8].js',
      path: path.join(__dirname, '../public'),
      publicPath: 'http://127.0.0.1:8000/public/'
    },
    plugins: [
      new VueLoaderPlugin()
    ],
    module:{
        rules:[
            {
              test: /\.(vue|js|jsx)$/,
              loader: 'eslint-loader',
              exclude: /node_modules/,
              enforce: 'pre'
            },
            {
                test:/\.vue$/,
                use: 'vue-loader'
                // options: createvueLoaderOptions(isDev)
            },{
               test:/\.jsx$/,
               use:{
                loader:'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: [require('@vue/babel-plugin-transform-vue-jsx')]
                }
               }
            },{
               test:/\.js$/,
               exclude:/node_modules/,
               use:{
                loader:'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
               }
            },{
               test:/\.(gif|jpg|jpeg|png|svg)$/,
               use:[
                   {
                    loader: 'url-loader',
                    options:{
                      limit: 1024,
                      name:'resource/[path][name].[hash:8].[ext]'
                    }
                   }
               ]
            }
       ]
    }
}

module.exports = config
