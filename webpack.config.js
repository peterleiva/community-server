const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const { loadEnvironment, applyPresets } = require('./build-tools');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 * Webpack configuration
 *
 * @param {object} env
 * @return {import('webpack').Configuration} env
 */
module.exports = env =>
  merge(
    {
      externalsPresets: { node: true },
      externals: [nodeExternals()],
      mode: env.mode,
      plugins: [new webpack.ProgressPlugin(), new CleanWebpackPlugin()],

      entry: path.resolve(__dirname, 'src', 'main.ts'),
      output: {
        filename: 'index.bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
    },
    loadEnvironment(env),
    applyPresets(Object.assign(env, { presets: ['typescript'] }))
  );
