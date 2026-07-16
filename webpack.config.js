import path from "path";

export default {
  entry: "./js/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve("dist"),
    clean: true,
  },
  devServer: {
    static: path.resolve("src"),
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
