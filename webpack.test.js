const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    entry: './src/test-web/index.tsx',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/test-web/index.html",
            // this property is passed to stop it from injecting the script twice.
            inject: false,
            filename: "./index.html"
        }),
        new CopyWebpackPlugin([
            {from: './src/styles/default-styles.css'}
        ])
    ],
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['*', '.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
                "exclude": /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|ttf|woff2)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};