/**
 * Webpack configuration object.
 *
 * Since Webpack can potentially be run independently from Gulp, it gets its
 * own config. We can still reference things like env flags & paths from the
 * main build config though.
 *
 * Webpack can get a bit hairy; look to the comments for explainations of
 * the whats and whys of the different settings.
 *
 * @see https://webpack.js.org/configuration/
 */

const config = require('./gulpfile.js/config');
const path = require('path');

const webpack = require('webpack');


const webpackConfig = {
  /**
   * The entry object is where Webpack looks to start building the bundle.
   * Setting the path wth `path.join()` causes an error, but since `path.resolve()`
   * generates an absolute path it seems to work. ¯\_(ツ)_/¯
   *
   *
   * @prop {Object} entry - Keys will be the bundled script filename.
   */
  entry: {
    app: path.resolve(config.source.js, 'App.js'),
  },

  /**
   * The base directory, an absolute path, for resolving entry points
   * and loaders from configuration. This makes our configuration
   * independent from CWD (current working directory).
   *
   * @prop {String} context - Set the base directory.
   */
  context: path.resolve(__dirname),

  /**
   * Note: `[name]` resolves to each key, or bundle, of the entry object.
   * The `chunkFilename` and `[chunkhash]` are experimental settings for
   * the `CommonsChunkPlugin`.
   */
  output: {
    path: path.resolve(config.build.js),
    publicPath: path.resolve(config.build.js),
    filename: '[name].js',
    // filename: '[name].[chunkhash].js',
    // chunkFilename: '[id].[chunkhash].js',
  },

  /**
   * Settings for how different modules will be processed.
   * Currently we only process JavaScript with Webpack, although this could
   * potentially be expanded to Pug templates or Sass styles.
   *
   * @see https://webpack.js.org/concepts/modules/
   */
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

      /**
       * Webpack Expose Loader
       *
       * This loader resolves all imports/requires of the 'jquery' module and
       * exposes the `$` and `jQuery` objects to the global window. This allows
       * us to use jQuery outside of our main scripts file, for example hard-coded
       * into templates.
       *
       * @see https://github.com/webpack-contrib/expose-loader
       */
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: 'jQuery',
          },
          {
            loader: 'expose-loader',
            options: '$',
          },
        ],
      },
    ],
  },

  resolve: {
    modules: ['node_modules', 'frontend/assets/js'],
    alias: {
      /**
       * Prefer unminified CommonJS/AMD files over bundled dist versions.
       * Let Webpack do all the bundling when we can.
       */
      jquery: 'jquery/src/jquery',
    },
  },

  /**
   * Plugins are where the real Webpack magic happens.
   */
  plugins: [

    /**
     * Create global constants which can be configured at compile time.
     *
     * Set our environment flag so we don't rely on the CLI variable.
     *
     * @see https://webpack.js.org/plugins/define-plugin/
     */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),

    /**
     * Experimental settings, uncomment at your own risk.
     */
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
    // new webpack.NoErrorsPlugin(),
  ],
};

if (process.env.NODE_ENV === 'development') {
  /**
   * Faster line-by-line source mapping during development.
   * @see https://webpack.js.org/configuration/devtool/#for-development
   */
  webpackConfig.devtool = 'cheap-module-eval-source-map';
}

if (process.env.NODE_ENV === 'production') {
  /**
   * Full-featured source maps and uglification for production.
   * @see https://webpack.js.org/configuration/devtool/#for-production
   */
  webpackConfig.devtool = 'source-map';
    /**
     * Minify the output JS.
     * @see  https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
     * @todo Update plugin class to contrib package.
     */
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    mangle: {
      screw_ie8: true,
      keep_fnames: true,
    },
    compress: {
      screw_ie8: true,
      warnings: false,
    },
    comments: false,
  }));
}

module.exports = webpackConfig;
