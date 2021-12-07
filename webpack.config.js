const path = require(`path`);

const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const CssMinimizerPlugin = require(`css-minimizer-webpack-plugin`);
const TerserJSPlugin = require(`terser-webpack-plugin`);

module.exports = {
  entry: `./src/index.js`,
  mode: `production`,
  output: {
    path: path.resolve(__dirname, `assets`),
    filename: `bundle.min.js`,
    assetModuleFilename: '[name][ext]'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: `babel-loader`,
          options: {
            presets: [`@babel/preset-env`]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          `css-loader`,
          `postcss-loader`,
          {
            loader: `sass-loader`,
            options: {
              implementation: require(`sass`)
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: `asset/resource`
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        type: `asset/resource`
      }
    ]
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin(), new CssMinimizerPlugin()]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `style.min.css`
    })
  ],

  devtool: 'source-map'
};
