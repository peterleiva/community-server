const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const { loadEnvironment, applyPresets } = require('./build-tools');

/**
 * Webpack configuration
 *
 * @param {object} env
 * @return {import('webpack').Configuration} env
 */
module.exports = env =>
  merge(
    {
      target: 'node',
      externalsPresets: { node: true },
      externals: [nodeExternals()],
      mode: env.mode,
      plugins: [new webpack.ProgressPlugin()],

      entry: path.resolve(__dirname, 'src', 'main.ts'),
      output: {
        filename: 'index.bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
    },
    loadEnvironment(env),
    applyPresets(Object.assign(env, { presets: ['typescript'] }))
  );
