const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const miniCSSExtractPlugin = require('mini-css-extract-plugin')

const babelOptions = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
    ]
}

module.exports = {
    entry: path.resolve(__dirname, 'src', 'ts', 'index.tsx'),
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        publicPath: '/',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    target: 'web',

    devServer: {
        hot: true,
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions
                },
                exclude: '/node_modules'
            },
            {
                test: /\.scss$/,
                use: [
                    miniCSSExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: 'file-loader'
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new miniCSSExtractPlugin({
            filename: '[name].css'
        })
    ]

}