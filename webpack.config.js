const path = require('path');
const { BannerPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackNodeExternals = require('webpack-node-externals');
const copyWebpackPlugin = require('copy-webpack-plugin');

const { NODE_ENV: mode = 'development' } = { ...process.env };

module.exports = {
  target: 'node',
  entry: './src/main.ts',
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  mode,

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader', 'eslint-loader'],
      },
    ],
  },
  devtool: 'inline-source-map',

  devServer: {
    contentBase: './dist',
  },

  plugins: [
    new copyWebpackPlugin({
      patterns: [{ from: 'src/public', to: 'public' }],
    }),
    new BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
      entryOnly: true,
    }),
    new CleanWebpackPlugin(),
  ],
  externals: [webpackNodeExternals()],

  resolve: {
    extensions: ['.tsx', '.ts'],
    alias: {
      ['@config']: path.join(__dirname, 'src', 'config'),
      ['@lib']: path.join(__dirname, 'src', 'lib'),
    },
  },
};
