// webpack 配置

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const outputPath = path.resolve(__dirname, 'dist');

const port = 9000;

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: '[name].bundle.js',
        path: outputPath
    },
    devServer: {
        useLocalIp: true,
        open: true,
        host: '0.0.0.0',
        contentBase: outputPath,
        compress: true,
        port
    },
    devtool: 'inline-source-map',
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerWebpackPlugin()
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            hash: true
        }),
        new EslintWebpackPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.less$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    }
};
