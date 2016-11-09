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
        }
      }
    ]
  },
  resolve: {
    root: './',
    extensions: ['', '.jsx', '.js'],
    modulesDirectories: ['./', 'node_modules'],
  }
}
