const webpack = require('webpack');
//const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  context: __dirname + '/public/js',
  entry: ['./index.js'],
  output: {
    path: __dirname + '/public/build',
    publicPath: '/build/',
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: 'public'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'ng-annotate']
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: "raw-loader"
      },
      //{ test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },

  resolve: {
    alias: {
      'npm': __dirname+'/node_modules'
    },
    extensions: ['', '.js', '.es6'] // not sure what this does
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
