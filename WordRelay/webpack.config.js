import path from 'path';

export default {
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

  // 중요!! - 출력
  output: {
    path: path.join(__dirname, 'dist'), // WordRelay/dist
    filename: 'app.js'
  },

}