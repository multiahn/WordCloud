'use strict'
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = process.env.PORT || 3000;
const path = require('path');

module.exports = {
    mode: 'development', // 1
    entry: {
        main: ['./src/index.js'] // 2
    },
    output: { // 3
        path: path.resolve(__dirname, './build'),
        filename: '[name].js' // 4
    },
    module: {
        rules: [
          { // 1
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname, './src'),
            loader: 'babel-loader',
          }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }, { // 2
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader',
                options: {
                  minimize: true,
                },
              },
            ],
          },
        ],
    },
    plugins: [
      new HtmlWebpackPlugin({
          template: 'public/index.html'
      }),
      new CopyWebpackPlugin({
        patterns:[
          {
            context: './public',
            from: '*.*'
          }
        ]
      })
    ],
    devServer: {
        host: 'localhost',
        port: port,
        open: true,
      },
  };