import HtmlWebpackHarddiskPlugin from "html-webpack-harddisk-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as webpack from "webpack";
import { rootPath } from "./utils";

const config: webpack.Configuration = {
  mode: "development", //todo
  module: {
    rules: [
      {
        test: /\.(jsx|js|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.s[a|c]ss$/,
        loader: "sass-loader!style-loader!css-loader",
      },
      {
        test: /\.(jpg|png|gif|jpeg|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000",
      },
    ],
  },
  context: rootPath("ui"),
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  entry: ["./index.tsx", "webpack-hot-middleware/client"],
  output: {
    path: rootPath("dist"),
    filename: "bundle.js",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: rootPath("ui/index.html"),
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
};

export default config;
