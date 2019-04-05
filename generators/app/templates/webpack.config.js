const webpack = require('webpack');
const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./gulp/config');

function createConfig(env) {

  let isProduction,
      webpackConfig;

  if (env === undefined) {
    env = process.env.NODE_ENV;
  }

  isProduction = env === 'production';

  webpackConfig = {
    mode: isProduction ? 'production' : 'development',
    context: path.join(__dirname, config.src.js),
    entry: {
      vendor: [
        'jquery',
        './vendor.js',
      ],
      app: './app.js',
    },
    devtool: isProduction ?
      '#source-map' :
      'cheap-module-eval-source-map',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, config.dest.js),
      publicPath: 'js/',
    },
    optimization: {
      // minimize: isProduction,
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            test: 'vendor',
            name: 'vendor',
            enforce: true,
          },
        },
      },
    },

    plugins: [

      // new UglifyJsPlugin(),

      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            formatter: require('eslint-formatter-pretty')
          }
        }
      }),

      // Визуализирует размер js файлов подключенных к проекту
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        analyzerPort: 4000,
        openAnalyzer: false,
      }),

      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),

      new webpack.NoEmitOnErrorsPlugin(),

    ],

    resolve: {
      // дополнительные каталоги к node_modules в которых будут искаться модули
      modules: [
        `${__dirname  }/${  config.src.vendor}`,
        'node_modules',
        'bower_components',
      ],
      descriptionFiles: [
        'package.json',
        'bower.json',
      ],
      alias: {
        // extensions: ['.js'],
        TweenLite: path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
        TweenMax: path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
        TimelineLite: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
        TimelineMax: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
        ScrollMagic: path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
        'animation.gsap': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
        vendor: path.resolve(__dirname, `/${config.src.vendor}`),
      },

    },

    module: {
      rules: [

        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'bower_components'),
          ],
        },

        // The pre parameter to check the source files
        // not modified by other loaders (eg babel-loader)
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: [
            /node_modules/,
            /bower_components/,
          ],
          loader: 'eslint-loader',
          options: {
            fix: true,
            cache: true,
            ignorePattern: __dirname + '/src/js/vendor/'
          },
        },
        // Allows you to unload jquery in the global scope
        {
          test: require.resolve('jquery'),
          use: [{
            loader: 'expose-loader',
            options: 'jQuery',
          },
          {
            loader: 'expose-loader',
            options: '$',
          },
          {
            loader: 'expose-loader',
            options: 'window.jQuery',
          }],
        },
      ],
    },
  };


  if (isProduction) {
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      })
    );
  }

  return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;