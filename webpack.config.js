const path = require('path');

module.exports = () => ({
  mode: 'production',
  target: 'node',
  entry: './src/server.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename:'main.bundle.js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js'],
  },
})