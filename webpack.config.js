const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  optimization: {
    minimize: false
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
};