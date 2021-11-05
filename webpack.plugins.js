const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new Dotenv(),
  new CopyPlugin({
    patterns: [
      {
        from: 'assets/**/*',
        to: 'assets'
      },
    ],
  }),
];
