const path = require("path");
const MyWebpackPlugin = require("./my-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: path.resolve("./dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    path.resolve("./my-webpack-loader.js")
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader",
                options: {
                    publicPath: "./dist/",
                    name: "[name].[ext]?[hash]",
                    limit: 500 // 500byte로 설정 (1024 = 1k)
                }
            }
        ]
    },
    plugins: [
        new MyWebpackPlugin()
    ]
};