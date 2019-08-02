const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

const paths = require('../../../utils/paths');
const config = require(paths.config);

module.exports = {
  mode: config.get('ENV'),
  watch: true,

  optimization: {
    removeAvailableModules: false,
    mergeDuplicateChunks: true,
    removeEmptyChunks: false,
    usedExports: true,
    minimize: false,
    splitChunks: false
  },

  // Webpack dev server
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    host: '127.0.0.1',
    port: 8000,
    hot: true,
    inline: true,
    overlay: true,
    compress: false,
    writeToDisk: true,
    disableHostCheck: true,
    contentBase: [paths['app/public'], paths['assets']]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: `${paths['assets']}/templates/app-index.html`
    }),

    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          options: {
            quality: 45
          }
        }
      ],
      overrideExtension: false,
      detailedLogs: true,
      silent: false,
      strict: true
    }),

    new webpack.HotModuleReplacementPlugin()
  ]
};
