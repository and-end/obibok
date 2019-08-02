const tailwindcss = require('tailwindcss');
const postcssImport = require('postcss-import');
const postcssReporter = require('postcss-reporter');
const postcssResponsiveType = require('postcss-responsive-type');
const postcssReporterFormatter = require('postcss-reporter/lib/formatter');
const cssnano = require('cssnano');

const config = require('../../config');
const paths = require('../../utils/paths');
const tailwindConfigPath = `${paths['app']}/tailwind.config.js`;

const commonPlugins = [
  postcssImport(),
  tailwindcss(tailwindConfigPath),
  postcssResponsiveType(),
  postcssReporter({
    formatter: postcssReporterFormatter()
  })
];

const productionPlugins = [
  cssnano({
    preset: [
      'advanced',
      {
        zIndex: false,
        discardComments: {
          removeAll: true
        }
      }
    ]
  })
];

module.exports = {
  plugins: config.get('ENV') === 'development' ? commonPlugins : commonPlugins.concat(productionPlugins)
};
