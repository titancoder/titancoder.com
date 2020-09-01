const path = require("path");
const skills = require("./skills-data.json");
const projects = require("./projects.json");
const about = require("./about.json");
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
          publicPath: "images",
          emitFile: true,
          esModule: false,
          name: "[name].[ext]",
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
      templateParameters: { skills: skills },
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      title: "About",
      template: "./src/views/about.html",
      templateParameters: { about: about },
    }),
    new HtmlWebpackPlugin({
      filename: "projects.html",
      title: "Projects",
      template: "./src/views/projects.html",
      templateParameters: { projects: projects },
    }),
    new HtmlWebpackPlugin({
      filename: "contact.html",
      title: "Contact",
      template: "./src/views/contact.html",
    }),
    new MiniCssExtractPlugin(),
  ],
  node: {
    fs: "empty",
  },
};

module.exports = config;
