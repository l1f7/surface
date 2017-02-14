var config          = require('./')
,   webpack         = require('webpack')
,   path            = require('path')
,   argv            = require('yargs').argv;

module.exports = function (env) {
  var jsDest
  ,   jsSrc  = config.sourceDirectory + 'js/';

  jsDest = (argv.proto) ? config.prototypeAssets + 'js/' : config.appAssets + 'js/'

  var webpackConfig = {
    // Entry will be the files created by Webpack,
    // the key is the name of the js file and it's
    // value is the "entry point" (source file) for
    // the javascript input
    src : jsSrc + '**',
    entry: {
      app:  [jsSrc + 'App.js']
    },
    output: {
      path: jsDest,
      publicPath: (argv.proto) ? config.prototypeAssets + 'js/' : '/static/js/',
      filename: '[name].js',
      // filename: '[name].[chunkhash].js',
      // chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: ['node_modules', 'raw/bower', 'raw/js'],
      root: __dirname,
      alias: {
        // Prefer unminified CommonJS/AMD files over bundled dist versions.
        jquery: "jquery/src/jquery"
      }
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: require.resolve("jquery"),
          loader: "expose-loader?$!expose-loader?jQuery"
        }
      ]
    },
    plugins: [
      // new webpack.optimize.CommonsChunkPlugin({
        // name: ['common', 'manifest'] // Specify the common bundle's name.
      // }),
      // Limit the maximum chunk count with --optimize-max-chunks 15
      // new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
      // Limit the minimum chunk size with --optimize-min-chunk-size 10000 (in chars)
      // new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
      // Deduplicate shared code, adds some overhead to entry chunk
      new webpack.optimize.DedupePlugin(),
      // Optmizie chunk order
      new webpack.optimize.OccurrenceOrderPlugin(),
      // Dont emit assets that include errors
      new webpack.NoErrorsPlugin()
    ]
  }

  return webpackConfig
}
