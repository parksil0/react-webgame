const path = require('path');

module.exports =  {
  name: 'word-relay-setting',
  mode: 'development', // 실서비스 : production
  devtool: 'eval',

  // 확장자 연결 도우미
  resolve: {
    extensions: ['.js', '.jsx']
  },

  // 중요!! - 입력
  entry: {
    app: ['./client'],
  },

  module: {
    rules: [{
      test: /\.jsx?/, // js, jsx
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 5% in KR', 'last 2 chrome versions'], // github.com/browserslist
            },
            debug: true,
          }],
          '@babel/preset-react'
        ],
      }
    }],
  },

  // 중요!! - 출력
  output: {
    path: path.join(__dirname, 'dist'), // WordRelay/dist
    filename: 'app.js'
  },

}