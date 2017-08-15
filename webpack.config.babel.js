const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

let buildDir = path.resolve(__dirname, 'dist');

const babelOptions = {
  presets: ['stage-2', 'react'],
  plugins: []
};

const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: babelOptions
    }
  },
  {
    test: /\.json$/,
    use: ['json-loader']
  },
  { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
  { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'file-loader' }
];

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    Popper: ['popper.js', 'default'],
    React: 'react'
  }),
  new HtmlWebpackPlugin({ template: 'src/index.ejs' })
];

const entry = {
  index: [
    './src/index.js'
  ]
};

module.exports = (env) => {
  env = env || {};
  if (env.production) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({ sourceMap: true }));
    plugins.push(new ExtractTextPlugin('style.css'));
    plugins.push(new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }));
    rules.push({
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    });
    babelOptions.presets.unshift('es2015');
  } else {
    babelOptions.presets.unshift(['es2015', { modules: false }]);
    babelOptions.plugins.push('react-hot-loader/babel');
    plugins.push(new webpack.HotModuleReplacementPlugin);
    rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    });
    entry.index.unshift('react-hot-loader/patch');
  }

  return {
    entry: entry,
    output: {
      path: buildDir,
      filename: '[name].bundle.js',
      chunkFilename: '[name].[chunkhash].bundle.js'
    },
    module: { rules: rules },
    devServer: { hot: true },
    devtool: 'cheap-module-source-map',
    plugins: plugins
  };
};
