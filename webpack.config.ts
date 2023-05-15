const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode:'development',
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    entry: './src/index.tsx',
    module: {
        rules: [
            {
              test: /\.(ts|tsx)$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'ts-loader',
                  options: {
                    transpileOnly: true,
                  },
                },
              ],
            },
            {
              test: /\.(png|jpe?g|gif)$/i,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                    outputPath: 'images',
                  },
                },
              ],
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader',
                ],
            }
        ],
    },
    output: {
        filename: 'bundle_index.js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(), // 웹팩 실행시마다 dist 폴더 정리
        new HtmlWebpackPlugin({
          //index.html 자동 생성되도록 template 옵션 설정
          template: "./public/index.html",
        }),
      ]
    
}