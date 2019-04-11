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
                        loader: 'style-loaders'
                    },
                    {
                        loader: 'css-loaders',
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
                    loader: 'babel-loaders',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
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
        minimize: false
        // splitChunks: {
        //     chunks: 'all'
        // }
    }
}