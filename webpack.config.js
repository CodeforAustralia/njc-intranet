console.log(__dirname);

module.exports = {
  context: __dirname + '/public/js',
  entry: ['./index.js'],
  output: {
    path: __dirname + '/public/build',
    publicPath: __dirname + '/public/js',
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
        loader: "babel-loader"
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.es6'] // not sure what this does
  }
};
