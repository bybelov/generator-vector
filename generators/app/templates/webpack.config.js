const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./gulp/config');

function createConfig(env) {

  if (env === undefined) {
    env = process.env.NODE_ENV;
  }

  const isProduction = env === 'production';
  const isMode = isProduction ? 'production' : 'development';

  const webpackConfig = {
    mode: isMode,
    context: path.join(__dirname, config.src.js),
    entry: {
      vendor: [
        'jquery',
        './vendor.js',
      ],
      app: './app.js',
    },
    devtool: isProduction ?
      false : 'cheap-module-eval-source-map',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, config.dest.js),
      publicPath: 'js/',
    },
    optimization: {
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
      // Минификация JS файлов
      new UglifyJsPlugin(),
      // Визуализирует размер js файлов подключенных к проекту
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        analyzerPort: 4000,
        openAnalyzer: false,
      }),
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

        // Параметр pre для проверки исходных файлов,
        // не измененных другими лоадерами (напр. babel-loader)
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: [
            /node_modules/,
            /bower_components/,
            /vendor/,
          ],
          loader: 'eslint-loader',
          options: {
            fix: true,
            cache: true,
          },
        },
        // Позволяет выгрузить jquery в глобальную область видимости
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

  return webpackConfig;
}

module.exports = createConfig();