const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
})

module.exports = {
    mode: 'development',
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
    plugins: [htmlWebpackPlugin],
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
                            sourceMap: true,
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
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: false
        // splitChunks: {
        //     chunks: 'all'
        // }
    }
}