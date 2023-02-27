const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const isProduction = process.env.NODE_ENV == 'production';

const config = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    clean: true
  },
  devServer: {
    open: true,
    host: 'localhost',
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }]
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './src/assets/favicon.png'
    }),
    new ESLintPlugin({
      extensions: ['.ts', '.tsx'],
      quiet: true
    }),
    new Dotenv()
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/']
      },
      {
        test: /\.mp3$/i,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...']
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
