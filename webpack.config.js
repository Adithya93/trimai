var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    //externals: [nodeExternals(), "react"],
    entry: {
        //main: './src/index.js'
        main: './src/app.js'
    },
    output: { path: __dirname + '/public', filename: 'bundle.js' },
    module: {
        loaders: [{test: /\.jsx?$/, loader: 'babel-loader',  exclude: /node_modules/},
        { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }],
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};
