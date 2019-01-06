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
        extensions: ['.js', '.jsx', '.css']
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
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: false,
            statsOptions: { source: false }
        }),
    ],  
};

module.exports = config;
