const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, 'src/index.js'),
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'volvo-vin-decoder.min.js',
    publicPath: '/dist/',
    library: 'VinDecoder',
    libraryTarget: 'umd',
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      comments: false,
      compress: {
        warnings: false,
      },
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_component)/,
        include: path.join(__dirname, 'src'),
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
};

