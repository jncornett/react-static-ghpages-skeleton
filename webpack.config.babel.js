const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

const rules = [
  {
    test: /\.jsx?/,
    exclude: /node_modules/,
    use: ['babel-loader']
  },
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })
  },
  {
    test: /\.less$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'less-loader']
    })
  }
];

const plugins = [
  new ExtractTextPlugin("style.css"),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks(module, count) {
      return module.context && module.context.indexOf('node_modules') != -1;
    }
  }),
  new webpack.HotModuleReplacementPlugin
];

module.exports = (env) => {
  if (env && env.production) {
    // prod only options
  } else {
    // dev only options
    plugins.push(new HtmlWebpackPlugin({
      template: 'src/index.ejs'
    }));
  }

  return {
    entry: {
      app: './src/app.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].[chunkhash].bundle.js'
    },
    module: {
      rules: rules,
    },
    devServer: {
      hot: true
    },
    devtool: 'eval-source-map',
    plugins: plugins
  };
};
