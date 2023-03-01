const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.jsx'),
  module: {
    rules: [
      {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
              options: {
              presets: ['@babel/preset-env', '@babel/preset-react'] 
              }
          }
          },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [ new HtmlWebpackPlugin({ template: './src/index.html' })],
  mode: process.env.NODE_ENV,
  devServer: {
    historyApiFallback: true,
    static: {
        directory: path.resolve(__dirname, './client'),
        publicPath: '/'
    },
    port: 8080,
    compress: true,
    proxy: {
        '/': 'http://localhost:3000/',
    }
  }, 
};


