const path = require('path')

module.exports = {
    entry: {
        app: './demo/index.js'
    },

    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'demo')
    },

    mode: 'development',
    optimization: {
        minimize: false
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
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

    devtool: 'cheap-inline-source-map',

    plugins: [],

    devServer: {
        // contentBase: path.resolve(__dirname, 'demo'),
        historyApiFallback: true,
        port: '8008',
        noInfo: false,
        overlay: true
    },
}