const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');
const { merge } = require("webpack-merge");

// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const devMode            = process.env.NODE_ENV !== "production";

/** @type {import('webpack').Configuration} */
const prod = {
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: "index.[contenthash].js",
        clean: true,
        // Keep original file’s name
        assetModuleFilename: "[name][ext]",
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.m?js$/,
                include: path.resolve(__dirname, '../src/js'),
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            // {
            //     test: /\.css$/i,
            //     use: [devMode? 'style-loader': MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            // },
            {
                type: "asset/resource",
                test: /\.(jpg|jpeg|png|gif|svg|ico)$/i
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
        ]
    },
    // devtool: 'source-map' // It's recommended
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: { removeAll: true }
                        }
                    ]
                }
            }),
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
        // runtimeChunk: {
        //     name: 'runtime',
        // },
        runtimeChunk: {
            name: entrypoint => `runtimechunk~${entrypoint.name}`
        },
        // splitChunks: {
        //     chunks: "all"       // Se genera los .map correspondientes, se aconseja no subirlos a prod
        // }
    },
    plugins: [
        new HtmlWebpackPlugin({
            // filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        // Copy all files of files-to-build folder inside build folder
        new CopyPlugin({
            patterns: [
                { from: './files-to-build', to: './' }
            ]
        }),
        new Dotenv({
            path: path.join(__dirname, "../.env.production.local")
        })
    ]
}

module.exports = merge(common, prod);