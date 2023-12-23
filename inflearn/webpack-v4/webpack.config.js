const path = require("path");
// const MyWebpackPlugin = require("./my-webpack-plugin");
const webpack = require("webpack");

const childProcess = require("child_process");

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
        new webpack.BannerPlugin({
            banner: `
                Build Date: ${new Date().toLocaleString()}
                Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}
            `
        }),
        new webpack.DefinePlugin({
            TWO: "1+1",
            TWOStr: JSON.stringify("1+1"),
            "api.url": JSON.stringify("https://app.api.com")
        })
    ]
};