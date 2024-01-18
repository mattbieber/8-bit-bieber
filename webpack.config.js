const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, "dist");

module.exports = {
  mode: "production",
  entry: {
    index: "./js/index.ts"
  },
  output: {
    path: dist,
    filename: "[name].js"
  },
  devServer: {
    contentBase: dist,
    host: '0.0.0.0',
    disableHostCheck: true, 
  },
  resolve: {
    extensions: [".js", ".ts", '.wasm']
  },
  devtool: 'inline-source-map',
  plugins: [
    new CopyPlugin([
      path.resolve(__dirname, "static")
    ]),

    new WasmPackPlugin({
      crateDirectory: __dirname,
    }),
  ],
  module: {
    rules: [{
        
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.wasm$/,
        type: "webassembly/experimental"
      }
    ]
  }
};
