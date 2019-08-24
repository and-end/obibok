const fs = require('fs');
const _ = require('lodash');
const colors = require('colors');
const webpack = require('webpack');
const { json2ts } = require('json-ts');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const responsiveLoaderAdapterSharp = require('responsive-loader/sharp');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const sveltePreprocess = require('svelte-preprocess');
const CopyPlugin = require('copy-webpack-plugin');

const paths = require('../../../utils/paths');
const config = require(paths.config);

const configInterface = json2ts(config, { rootName: 'CONFIG', prefix: '' });
const configInterfaceFilePath = `${paths.root}/types/config.ts`;
const tsconfigPath = `${paths['app']}/tsconfig.json`;
const postcssConfig = { config: { path: paths['app'] } };

const loaders = {
  babel: {
    loader: 'babel-loader'
  },

  typescript: {
    loader: 'ts-loader',
    options: {
      configFile: tsconfigPath
    }
  },

  svelte: {
    loader: 'svelte-loader',
    options: {
      emitCss: true,
      hotReload: false,
      preprocess: sveltePreprocess({
        /**
         * Wait for official (first class) Svelte support for TypeScript
         */
        /*typescript: ({ content, filename }) => {
          // const tsResult = ts.transpileModule(content, {
          //   compilerOptions: {
          //     project: tsconfigPath
          //   },
          //   reportDiagnostics: true,
          //   fileName: filename,
          // });

          // return {
          //   code: tsResult.outputText,
          //   map: tsResult.sourceMapText
          // };

          const { code } = sveltePreprocessTs().script({
            content,
            filename,
            attributes: {
              lang: 'ts'
            }
          });

          return { code };
        }*/

        postcss: postcssConfig
      })
    }
  },

  cssExtract: {
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: true
    }
  },

  style: {
    loader: 'style-loader'
  },

  css: {
    loader: 'css-loader'
  },

  cssWithModules: {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      modules: {
        mode: 'local',
        localIdentName: '[sha512:contenthash:base64:3]'
      }
    }
  },

  postcss: {
    loader: 'postcss-loader',
    options: postcssConfig
  },

  fastSass: {
    loader: 'fast-sass-loader'
  },

  file: {
    loader: 'file-loader',
    options: {
      emitFile: false,
      name: '[name].[ext]',
      publicPath: 'images/'
    }
  },

  responsiveLoader: {
    loader: 'responsive-loader',
    options: {
      adapter: responsiveLoaderAdapterSharp,
      outputPath: '../public/images', // for some reason absolute paths are not working here
      publicPath: `${paths['app/public']}/images`,
      sizes: [240, 360, 640, 968, 1360],
      placeholder: true,
      placeholderSize: 1
    }
  },

  svgInlineLoader: {
    loader: 'svg-inline-loader'
  }
};

// Save TypeScript interface for config object
fs.writeFile(configInterfaceFilePath, `export ${configInterface}`, function(error) {
  if (error) {
    return console.error(error);
  }

  console.log(`

The config file interface ${colors.bold('was saved')} at ${colors.cyan.bold(
    configInterfaceFilePath
      .split('/')
      .slice(-3)
      .join('/')
  )}
  `);
});

module.exports = {
  mode: config.get('ENV'),
  watch: false,
  devtool: 'eval',
  stats: {
    colors: true,
    hash: true,
    timings: true,
    assets: true,
    modules: true,
    children: true
  },
  entry: {
    app: `${paths.app}/src/index.ts`,
    fonts: `${paths.app}/styles/fonts.scss`,
    styleIndex: `${paths.app}/styles/index.scss`
  },
  output: {
    path: paths['app/public'],
    filename: '[name]-[hash].js',
    chunkFilename: '[name].[id].js'
  },
  resolve: {
    extensions: ['.mjs', '.ts', '.svelte', '.html', '.css', '.scss', '.js'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
    modules: [paths['app/node_modules'], paths.node_modules],
    plugins: [new TsconfigPathsPlugin({ configFile: tsconfigPath })]
  },
  optimization: {
    removeAvailableModules: false,
    mergeDuplicateChunks: true,
    removeEmptyChunks: false,
    usedExports: true,
    minimize: false,
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
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
      // TypeScript
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [loaders.babel, loaders.typescript]
      },

      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [loaders.babel]
      },

      // Svelte
      {
        test: /\.(svelte)$/,
        use: [loaders.svelte]
      },

      // Styles (modules)
      {
        test: /\.(sa|sc|c)ss$/,
        use: [loaders.cssExtract, loaders.cssWithModules, loaders.postcss, loaders.fastSass]
      },

      // Styles (global)
      {
        test: /\.(global).(sa|sc|c)ss$/,
        use: [loaders.cssExtract, loaders.css, loaders.postcss, loaders.fastSass]
      },

      // Images
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: [loaders.responsiveLoader]
      },

      // Images SVG
      {
        test: /\.(svg)$/,
        use: [loaders.svgInlineLoader]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),

    new CopyPlugin([{ from: paths.assets, to: `${paths['app/public']}/assets` }]),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),

    new webpack.DefinePlugin(
      _(config.get())
        .mapKeys((_, key) => `CONFIG.${key.toUpperCase()}`)
        .mapValues((value) => JSON.stringify(value))
        .value()
    ),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new HardSourceWebpackPlugin()
  ]
};
