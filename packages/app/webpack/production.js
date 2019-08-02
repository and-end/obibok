const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');

const paths = require('../../../utils/paths');
const config = require(paths.config);

module.exports = {
  mode: config.get('ENV'),
  watch: false,
  devtool: 'cheap-module-source-map',
  optimization: {
    removeAvailableModules: true,
    mergeDuplicateChunks: true,
    removeEmptyChunks: true,
    usedExports: true,
    minimize: true,
    splitChunks: {
      chunks: 'all',
      minSize: 3000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 20,
      maxInitialRequests: 5,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      }
    ]
  },

  plugins: [
    // brotli,

    new CopyPlugin([{ from: paths.assets, to: `${paths['app/public']}/assets` }]),

    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          options: {
            quality: 50
          }
        }
      ],
      overrideExtension: false,
      detailedLogs: true,
      silent: false,
      strict: true
    }),

    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: `${paths['assets']}/templates/app-index.html`
    }),

    new HtmlCriticalWebpackPlugin({
      base: paths['app/public'],
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false
      }
    }),

    new CompressionPlugin({
      algorithm: 'brotliCompress',
      filename: '[path].br[query]',
      test: /\.(js|css|html|svg|jpe?g|png|webp|gif)$/,
      threshold: 4096,
      minRatio: 0.8,
      compressionOptions: { level: 11 },
      deleteOriginalAssets: false
    }),

    new CompressionPlugin({
      algorithm: 'gzip',
      filename: '[path].gz[query]',
      test: /\.(js|css|html|svg|jpg|jpeg|png|webp|gif)$/,
      threshold: 4096,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
      deleteOriginalAssets: false
    })
  ]
};
