const path = require(`path`);

const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const CssMinimizerPlugin = require(`css-minimizer-webpack-plugin`);
const TerserJSPlugin = require(`terser-webpack-plugin`);

module.exports = {
  entry: `./src/index.js`,
  mode: `production`,
  output: {
    path: path.resolve(__dirname, `assets`),
    filename: `bundle.min.js`
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
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: `css-loader`
          },
          {
            loader: `postcss-loader`
          },
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
        use: [
          {
            loader: `file-loader`,
            options: {
              outputPath: `assets`
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: `file-loader`,
            options: {
              name: `[name].[ext]`
            }
          }
        ]
      }
    ]
  },

  optimization: {
    minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin()]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `style.min.css`
    })
  ],

  devtool: 'source-map'
};
