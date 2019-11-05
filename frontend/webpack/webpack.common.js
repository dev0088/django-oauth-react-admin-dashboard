const eslint = require('eslint');
const webpack = require('webpack');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
// const path = require('path');
const commonPaths = require('./paths');

module.exports = {
  entry: commonPaths.entryPath,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        options: {
          formatter: eslint.CLIEngine.getFormatter('stylish'),
          emitWarning: process.env.NODE_ENV !== 'production',
        },
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              outputPath: commonPaths.fontsFolder,
            },
          },
          // {
          //   loader: 'url-loader'
          // },
        ],
      },
    ],
    // loaders: [
    //   {
    //       test: /\.js$/,
    //       loaders: ["babel"],
    //       include: path.join(__dirname, "src")
    //   },
    //   {
    //       // expose immutable globally so we can use it in app.html
    //       test: require.resolve("immutable"),
    //       loader: "expose?immutable"
    //   },
    //   {
    //       test: /\.less$/,
    //       loader: MiniCssExtractPlugin.extract("css?sourceMap!less?sourceMap")
    //   },
    //   {
    //       // move font files found within CSS to the build directory
    //       test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    //       loader: "file?name=[path][name].[ext]?[hash]&context=./node_modules"
    //   },
    //   {
    //       // move images found within CSS to the build directory
    //       test: /\.(jpg|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    //       loader: "file?name=[path][name].[ext]?[hash]&context=./node_modules"
    //   }
    // ]
  },
  serve: {
    add: app => {
      app.use(convert(history()));
    },
    content: commonPaths.entryPath,
    dev: {
      publicPath: commonPaths.outputPath,
    },
    open: true,
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json', '.css', '.scss'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
      filename: commonPaths.indexFilePath
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    })
  ],
};
