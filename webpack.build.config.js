const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: {
        app: './src/TrueScrollBar.js'
    },

    output: {
        filename: 'TrueScrollBar.min.js',
        path: path.resolve(__dirname, 'src'),
        umdNamedDefine: true,
        library: 'TrueScrollBar',
        libraryExport: 'default',
        libraryTarget: 'umd',
    },

    target: 'web',

    mode: 'production',

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'TrueScrollBar.min.css'
        }),

        new OptimizeCSSAssetsPlugin({})
    ],

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                output: {
                    comments: false,
                },
            },
            extractComments: false,
        })]
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.sass$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                indentedSyntax: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ]
    },

    devtool: false,

    devServer: {
        contentBase: path.resolve(__dirname, 'demo'),
        historyApiFallback: true,
        port: '8008',
        noInfo: false,
        overlay: true
    },
}