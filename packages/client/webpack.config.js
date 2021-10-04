/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.html$/,
                use: [
                    "html-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "src/index.html",
            filename: "index.html"
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx'],
            emitWarning: true,
            failOnError: true,
            failOnWarning: false
        })
    ]
}