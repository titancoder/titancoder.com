const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: path.resolve(__dirname, "src") + "/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          outputPath: "images",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "Titan Coder",
      template: "./src/views/index.html",
      templateParameters: { test: "Titan Coder" },
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      title: "About",
      template: "./src/views/about.html",
      templateParameters: { test: "Titan Coder" },
    }),
    new HtmlWebpackPlugin({
      filename: "projects.html",
      title: "Projects",
      template: "./src/views/projects.html",
      templateParameters: { test: "Titan Coder" },
    }),
    new HtmlWebpackPlugin({
      filename: "tutorials.html",
      title: "Tutorials",
      template: "./src/views/tutorials.html",
      templateParameters: { test: "Titan Coder" },
    }),
    new HtmlWebpackPlugin({
      filename: "contact.html",
      title: "Contact",
      template: "./src/views/contact.html",
      templateParameters: { test: "Titan Coder" },
    }),
    new MiniCssExtractPlugin(),
  ],
  node: {
    fs: "empty",
  },
};

module.exports = config;
