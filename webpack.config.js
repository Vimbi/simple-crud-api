const path = require('path');

    // "dev": "webpack serve --env develop",

// const devServer = (isDev) => !isDev ? {} : {
//   devServer: {
//     historyApiFallback: true,
//     static: path.join(__dirname, 'dist'),
//     compress: true,
//     open: true,
//     hot: true,
//     port: 8080,
//     proxy: {
//       '/': {
//            target: 'http://localhost:8080',
//            router: () => 'http://localhost:3000',
//       }
//    }
//   }
// };

module.exports = (argv) => ({
  watch: true,
  mode: argv.mode,
  target: 'node',
  entry: './src/server.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename:'[name].bundle.js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js'],
  },
})