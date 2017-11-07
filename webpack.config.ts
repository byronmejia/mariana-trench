import { Configuration } from 'webpack';
import { resolve } from 'path';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config: Configuration = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    resolve: {
        extensions: [ '.ts' ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/, loader: 'url-loader'
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist')
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './static'
            }
        ]),
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: '!!pug-loader!./src/popup.pug',
            title: 'Mariana Trench Editor'
        })
    ]
};

export default config;
