const path = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');

/** @type {string} Typescript build configuration file path */
const rootPath = path.resolve(__dirname, '..', '..');
const configFile = path.resolve(rootPath, 'tsconfig.build.json');

/**
 * Webpack production environment
 *
 * @param {object} env
 * @returns import("webpack").Configuration
 */
module.exports = env => ({
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: { files: './src/**/*' },
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'Community Server build',
      excludeWarnings: true,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.json'],
    symlinks: false,
    plugins: [new TsconfigPathsPlugin({ configFile })],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(rootPath, 'src'),
        exclude: /__tests__/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile,
            transpileOnly: true,
            happyPackMode: true,
          },
        },
      },
    ],
  },
});
