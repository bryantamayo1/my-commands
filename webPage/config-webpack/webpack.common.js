const path = require('path');

/** @type {import('webpack').Configuration} */
module.exports = {
  resolve: {
    alias: {
      '@js': path.resolve(__dirname, '../src/js'),
      '@src': path.resolve(__dirname, '../src'),
    }
  }
}