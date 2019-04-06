const webpack                        = require('webpack');
const MiniCSSExtractPlugin           = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const nodeExternals                  = require('webpack-node-externals');

const serverConfig = {
  mode: 'development',
  entry: {
    server: './src/server.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  target: 'node',
  externals: [nodeExternals()],
  node: {
    fs: 'empty',
    net: 'empty'
  },
  devtool: 'source-map'
};

const clientConfig = {
  mode: 'development',
  entry: {
    app: ['./src/client.js', './src/main.css'],
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/public`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        config : {
          path: './postcss.config.js'
        }
      }
    }),
    new MiniCSSExtractPlugin({
      filename: 'app.css',
      path: `${__dirname}/public`
    }),
    new OptimizeCSSAssetsWebpackPlugin({
      cssProcessorOptions: {
        map: {
          inline: false
        }
      }
    })
  ],
  target: 'web',
  devtool: 'source-map'
};

module.exports = [serverConfig, clientConfig];
