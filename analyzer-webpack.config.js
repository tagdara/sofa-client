const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
    entry:  __dirname + '/src/index.jsx',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: "/bundle/",
    },
    resolve: {
        extensions: ['.mjs', '.js', '.jsx', '.css']
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }
      ]
    },
    plugins : [
        new BundleAnalyzerPlugin({ 'analyzerHost':'mork.dayton.home', 'analyzerPort':9999})
        ],  
};

module.exports = config;
