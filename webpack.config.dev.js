var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign({}, require('./webpack.config.common'), {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: [
      'webpack-hot-middleware/client',
     path.resolve('./src/index.jsx')
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new HtmlWebpackPlugin({
    //   template: 'public/index.tpl.html',
    //   inject: 'body',
    //   filename: 'index.html',
    // }),
  ]
});
