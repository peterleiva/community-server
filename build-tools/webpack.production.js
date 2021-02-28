const webpack = require('webpack');

/**
 * Webpack production environment
 *
 * @param {object} env
 * @returns import("webpack").Configuration
 */
module.exports = env => ({
  plugins: [
    new webpack.BannerPlugin({
      raw: true,
      banner: '#!/usr/bin/env node',
      entryOnly: true,
    }),
  ],
});
