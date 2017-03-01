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
    entry: {
      app: jsSrc + 'App.js',
    },
    output: {
      path: jsDest,
      publicPath: (argv.proto) ? config.prototypeAssets + 'js/' : '/static/js/',
      filename: '[name].js',
      // filename: '[name].[chunkhash].js',
      // chunkFilename: '[id].[chunkhash].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        {
          test: require.resolve('jquery'),
          loader: 'expose-loader?$!expose-loader?jQuery',
        },
      ],
    },
    resolve: {
      modules: ['node_modules', 'frontend/js'],
      alias: {
        // Prefer unminified CommonJS/AMD files over bundled dist versions.
        'jquery': 'jquery/src/jquery',
      },
    },
    context: path.resolve('.'),
    plugins: [
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor',
      //   filename: "vendor.app.js",
      //   minChunks(module) {
      //     // include all imported scripts that are in the node_modules
      //     // or raw/js/vendor directories
      //     return module.context && module.context.indexOf('node_modules') !== -1
      //       || module.context && module.context.indexOf('raw/js/vendor') !== -1;
      //   },
      // }),
      // Limit the maximum chunk count with --optimize-max-chunks 15
      // new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),

      // Limit the minimum chunk size with --optimize-min-chunk-size 10000 (in chars)
      // new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),

      // Optmizie chunk order
      // new webpack.optimize.OccurrenceOrderPlugin(),

      // webpack.NoErrorsPlugin() is an optional plugin that tells the
      // reloader to not reload if there is an error. The error is simply
      // printed in the console, and the page does not reload.
      // If you do not have this plugin enabled and you have an error,
      // a red screen of death is thrown.
      // new webpack.NoErrorsPlugin()
    ],
  }

  return webpackConfig
}
