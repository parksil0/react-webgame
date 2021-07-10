const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval', //hidden-source-app
  resolve: {
    extensions: ['.jsx', '.js'],
  },

  entry: {
    app: './client',
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        // preset은 플러그인들의 모음
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 5% in KR', 'last 2 chrome versions'], // github.com/browserslist
            },
            debug: true,
          }],
          '@babel/preset-react'
        ],
        plugins: [],
      }
    }],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
  ],

  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'), 
  },
}