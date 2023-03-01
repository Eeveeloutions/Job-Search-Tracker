const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/client/index.jsx'),
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
  plugins: [ new HtmlWebpackPlugin({ template: './src/client/index.html' }),
    new CopyPlugin({
      patterns: [{ from: './src/client/style.css' }],
    }),
  ],
  mode: process.env.NODE_ENV,
  devServer: {
    historyApiFallback: true,
    static: {
        directory: path.resolve(__dirname, './src/client'),
        publicPath: '/'
    },
    port: 8080,
    compress: true,
    proxy: {
        '/': 'http://localhost:3000/',
    }
  }, 
};



// module.exports = {
//   mode: 'development',
//   entry: './src/client/App.tsx',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: ['babel-loader'],
//       },
//       {
//         test: /\.(ts|tsx)$/,
//         exclude: /node_modules/,
//         use: ['ts-loader'],
//       },
//       {
//         test: /\.css$/i,
//         use: ['style-loader', 'css-loader'],
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.jsx', '.js', '.ts', '.tsx'],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/client/index.html',
//       filename: './index.html',
//     }),
//     new CopyPlugin({
//       patterns: [{ from: './src/client/style.css' }],
//     }),
//   ],
//   devServer: {
//     static: {
//       directory: path.join(__dirname, './dist'),
//     },
//     proxy: {
//       '/api': 'http://localhost:3000',
//       secure: false
//     }
//   },

// }