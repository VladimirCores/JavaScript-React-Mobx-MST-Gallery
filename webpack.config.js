const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
	template: './src/index.html',
	filename: './index.html'
})

const teaserWebpackPlugin = new TerserPlugin({
	terserOptions:{
		ecma: 6,
		warnings: false,
		parse: {},
		compress: {},
		mangle: false, // Note `mangle.properties` is `false` by default.
		module: true,
		output: null,
		toplevel: false,
		nameCache: null,
		ie8: false,
		keep_classnames: true,
		keep_fnames: true,
		safari10: false,
	},
})

module.exports = {
    mode: 'production',
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [htmlWebpackPlugin, teaserWebpackPlugin],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            importLoaders: 1,
                            localIdentName: '[name]_[local]_[hash:base64]',
                            sourceMap: false,
                            minimize: false
                        }
                    }
                ]
            },
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            "@babel/plugin-transform-runtime",
                            ["@babel/plugin-proposal-decorators", { legacy: true }],
                            '@babel/plugin-syntax-dynamic-import',
                            ["@babel/plugin-proposal-class-properties", { "loose": true}]
                        ]
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: true
        // splitChunks: {
        //     chunks: 'all'
        // }
    }
}