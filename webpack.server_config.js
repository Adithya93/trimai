var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    externals: [nodeExternals(), "react"],
    entry: {
        //main: './src/index.js'
        main: './src/index.js'
    },
    output: { path: __dirname, filename: 'server_bundle.js' },
    module: {
        loaders: [{test: /\.jsx?$/, loader: 'babel-loader',  exclude: /node_modules/},
        { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }],
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};
