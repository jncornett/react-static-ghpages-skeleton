const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

function commonRules() {
  // use a map for rules so that we can easily access specific rules based on our
  // build settings.
  return {
    js: {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-2' /* required for dynamic import() */],
          plugins: []
        }
      }
    },
    jsx: {
      test: /\.jsx$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-2' /* required for dynamic import() */, 'react'],
          plugins: []
        }
      }
    },
    // rule for font-awesome
    // TODO: make this rule fa-specific
    woff: { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
    // rule for font-awesome
    // TODO: make this rule fa-specific
    fonts: { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'file-loader' }
  };
}

function commonPlugins() {
  return [
    new webpack.ProvidePlugin({
      // for bootstrap 4
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      // for react
      React: 'react'
    })
  ];
}

function buildConfig({ entry, rules, plugins }) {
  return {
    entry: entry,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].[chunkhash].bundle.js'
    },
    module: {
      rules: Object.values(rules)
    },
    devServer: {
      hot: true
    },
    devtool: 'cheap-module-source-map',
    plugins: plugins
  };
}

function getEnv(env) {
  let envType = 'dev'; // default to dev build
  if (env) {
    // this flag is set by running `webpack --env.production`
    if (env.production)
      envType = 'prod';
    // `webpack --env.test`
    else if (env.test)
      envType = 'test';
    // `webpack --env.dev`
    else if (env.dev)
      envType = 'dev';
    else
      console.log(`Unrecognized build env (${env}), falling back to ${envType}`);
  }
  return envType;
}

module.exports = function(env) {
  const rules = commonRules();
  const plugins = commonPlugins();
  const entry = {
    index: ['./src/index.jsx']
  };
  switch (getEnv(env)) {
    case 'prod':
      plugins.push(
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
        new ExtractTextPlugin('style.css'),
        new webpack.EnvironmentPlugin({NODE_ENV: 'production'}),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
        new HtmlWebpackPlugin({ template: 'src/index.ejs' })
      );
      rules.css = {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      };
      break;
    case 'test':
      // Need this rule because we're not using ExtractTextPlugin in dev.
      rules.css = {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      };
      break;
    case 'dev':
      plugins.push(
        new webpack.HotModuleReplacementPlugin,
        new webpack.NamedModulesPlugin,
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
        new HtmlWebpackPlugin({ template: 'src/index.ejs' })
      );
      // Need this rule because we're not using ExtractTextPlugin in dev.
      rules.css = {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      };
      // stop babel from processing import statements so that HMR will work.
      ['js', 'jsx'].forEach(type => {
        const i = rules[type].use.options.presets.indexOf('es2015');
        if (i != -1) {
          rules[type].use.options.presets[i] = ['es2015', { modules: false }];
        }
        rules[type].use.options.plugins.push('react-hot-loader/babel');
      });
      entry.index.unshift('react-hot-loader/patch');
      break;
  }
  return buildConfig({ entry, rules, plugins });
};
