const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AureliaWebpackPlugin = require('aurelia-webpack-plugin');
const project = require('./package.json');

const outDir = path.resolve('public');

const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || 'development';
const DEBUG = ENV !== 'production';
const metadata = {
  port: process.env.WEBPACK_PORT || 9000,
  host: process.env.WEBPACK_HOST || 'localhost',
  ENV: ENV,
  HMR: process.argv.join('').indexOf('hot') >= 0 || !!process.env.WEBPACK_HMR
};

module.exports = {
  entry: {
    'app': ["./src/main"], // <-- this array will be filled by the aurelia-webpack-plugin
    'aurelia': Object.keys(project.dependencies).filter(dep => dep.startsWith('aurelia-'))
  },
  output: {
    path: __dirname + "/public",
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: require.resolve('tinymce/tinymce'),
        loaders: [
          'imports?this=>window',
          'exports?window.tinymce'
        ]
      },
      {
        test: /tinymce\/(themes|plugins)\//,
        loaders: [
          'imports?this=>window'
        ]
      }
    ],
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            [ 'es2015', {
              loose: true, // this helps simplify javascript transformation
              module: false // this helps enable tree shaking for webpack 2
            }],
            'stage-1'
          ],
          plugins: ['transform-decorators-legacy']
        }
      },
      {
        test: /\.html$/,
        exclude: /index\.html$/, // index.html will be taken care by HtmlWebpackPlugin
        use: [
          'raw-loader',
          'html-minifier-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|woff|woff2|ttf)$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      regeneratorRuntime: 'regenerator-runtime', // to support await/async syntax
      Promise: 'bluebird', // because Edge browser has slow native Promise object
      $: 'jquery', // because 'bootstrap' by Twitter depends on this
      jQuery: 'jquery', // just an alias
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new AureliaWebpackPlugin({
      root: path.resolve(),
      src: path.resolve('src'),
      baseUrl: '/'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['aurelia']
    }),
    new webpack.IgnorePlugin(new RegExp("^(sequelize|sequelize-cli|react|pg-hstore|pg)$")),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        'html-minifier-loader': {
          removeComments: true,               // remove all comments
          collapseWhitespace: true,           // collapse white space between block elements (div, header, footer, p etc...)
          collapseInlineTagWhitespace: true,  // collapse white space between inline elements (button, span, i, b, a etc...)
          collapseBooleanAttributes: true,    // <input required="required"/> => <input required />
          removeAttributeQuotes: true,        // <input class="abcd" /> => <input class=abcd />
          minifyCSS: true,                    // <input style="display: inline-block; width: 50px;" /> => <input style="display:inline-block;width:50px;"/>
          minifyJS: true,                     // same with CSS but for javascript
          removeScriptTypeAttributes: true,   // <script type="text/javascript"> => <script>
          removeStyleLinkTypeAttributes: true // <link type="text/css" /> => <link />
        }
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: { screw_ie8: true, keep_fnames: true},
      dead_code: true,
      unused: true,
      comments: true,
      compress: {
        screw_ie8: true,
        keep_fnames: true,
        drop_debugger: false,
        dead_code: false,
        unused: false,
        warnings: false
      }
    })
  ],
};
