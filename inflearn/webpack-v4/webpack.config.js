const path = require("path");
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
                loader: "file-loader",
                options: {
                    publicPath: "./dist/",
                    name: "[name].[ext]?[hash]"
                }
            }
        ]
    }
};