const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

let buildDir = path.resolve(__dirname, 'dist');

const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['es2015', { modules: false }, 'react']
      }
    }
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
  },
  {
    test: /\.json$/,
    use: ['json-loader']
  },
  { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
  { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'file-loader' }
];

const plugins = [
  new ExtractTextPlugin("style.css"),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks(module, count) {
      return module.context && module.context.indexOf('node_modules') != -1;
    }
  }),
  new webpack.HotModuleReplacementPlugin,
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    Popper: ['popper.js', 'default'],
    React: 'react'
  }),
  new HtmlWebpackPlugin({ template: 'src/index.ejs' })
];

module.exports = (env) => {
  env = env || {};
  if (env.ghpages) {
    buildDir = path.resolve(__dirname);
  }

  return {
    entry: {
      index: './src/index.js'
    },
    output: {
      path: buildDir,
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
