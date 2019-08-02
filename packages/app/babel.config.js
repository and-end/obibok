module.exports = {
  env: {
    development: {
      presets: [['@babel/preset-env', { useBuiltIns: 'entry', corejs: 3 }]]
    },
    production: {
      presets: ['minify']
    }
  }
};
