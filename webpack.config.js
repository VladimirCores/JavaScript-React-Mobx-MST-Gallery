const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    app: './src/index.js'
  },
  optimization: {
	  minimize: true,
	  minimizer: [
      new TerserPlugin({
			  sourceMap: false,
			  terserOptions: {
				  ecma: 6,
				  module: true,
				  keep_classnames: false,
        }
      }),
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [], // '@babel/preset-env'
            plugins: [] // '@babel/plugin-transform-runtime'
          }
        }
      }
    ]
  }
};