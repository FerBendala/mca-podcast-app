const path = require( 'path' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' )

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    entry: './src/index.js',
    output: {
        filename: isProduction
            ? 'main[contenthash].js'
            : 'main.js',
        path: path.resolve( __dirname, isDevelopment ? 'dev_build' : 'dist' )
    },
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'inline-source-map' : false,
    plugins: [
        new HtmlWebpackPlugin( {
            template: path.join( __dirname, 'public', 'index.html' ),
            minify: isProduction
        } ),
        isProduction && new MiniCssExtractPlugin( {
            filename: 'main.[contenthash].css'
        } ),
        isProduction && new CleanWebpackPlugin(),
    ].filter( Boolean ),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
                options: {
                    limit: 10000,
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100000,
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
}