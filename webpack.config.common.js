var path = require('path');
var webpack = require('webpack');

module.exports = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/vr'
  },
  resolve: {
    modules: [
          'node_modules',
          path.resolve(__dirname, './node_modules')
      ]
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: [
        path.resolve('./src')
      ],
      loader: 'babel-loader',
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader?-svgo'
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.html$/,
      loader: "html"
    }]
  },
};
