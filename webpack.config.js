const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const webpack = require('webpack');

module.exports = {
  entry: './main.js',
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 3333
  },
  module: {
    loaders: [
      {
        test: /\.(js(x)?)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
        },
      },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader',
    'css!resolve-url!sass?sourceMap') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
      { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=5000&name=fonts/[name].[hash].[ext]?' },
    ]
  },
  noParse: /\.min\.js/,
  postcss: () => [autoprefixer, cssnano],
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('bundle.css'),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    })
  ],
  resolve: {
    root: './',
    extensions: ['', '.jsx', '.js'],
    modulesDirectories: ['./', 'node_modules'],
  }
}
