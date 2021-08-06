const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    clean: true
  },
  experiments: {
    topLevelAwait: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html')

    }),
    new HtmlWebpackPlugin({
      filename: 'aboutus.html',
      template: path.resolve(__dirname, 'src/aboutus.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'directmessage.html',
      template: path.resolve(__dirname, 'src/directmessage.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'hometimeline.html',
      template: path.resolve(__dirname, 'src/hometimeline.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'post.html',
      template: path.resolve(__dirname, 'src/post.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'publictimeline.html',
      template: path.resolve(__dirname, 'src/publictimeline.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'register.html',
      template: path.resolve(__dirname, 'src/register.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'yourtimeline.html',
      template: path.resolve(__dirname, 'src/yourtimeline.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'searchtimeline.html',
      template: path.resolve(__dirname, 'src/searchtimeline.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/i,
        loader: 'standard-loader',
        options: {
          env: {
            browser: true
          }
        }
      }
    ]
  },
  mode: 'development',
  devtool: 'inline-source-map'
}
