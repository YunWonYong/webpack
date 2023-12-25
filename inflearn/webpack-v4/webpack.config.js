const path = require("path");
// const MyWebpackPlugin = require("./my-webpack-plugin");
const webpack = require("webpack");

const childProcess = require("child_process");

//plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
console.log("build node env:", JSON.stringify(process.env.NODE_ENV));

const buildEnv = (process.env.NODE_ENV || "") === ""? "development": process.env.NODE_ENV;

const isDevEnv = () => {
    return buildEnv === "development";
};

// const isLiveEnv = () => {
//     return buildEnv === "production";
// };

module.exports = {
    mode: buildEnv,
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
                loader: "babel-loader",
                exclude: /node_modules/ //babel loader가 module을 처리하지 않도록 설정
            },
            {
                test: /\.css$/,
                use: [
                    isDevEnv()? "style-loader": MiniCssExtractPlugin.loader,                    
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader",
                options: {
                    // publicPath: "./dist/",
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
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            templateParameters: {
                env: isDevEnv()? "(개발용)": ""
            },
            minify: isDevEnv()? false: {
                collapseWhitespace: true, // bundling 결과인 index.html 에 있는 공백 제거
                removeComments: true // bundling 결과인 index.html 에 있는 주석 제거
            }
        }),
        new CleanWebpackPlugin(),
        ...(isDevEnv()? []: [new MiniCssExtractPlugin({
            filename: "[name].css"
        })])
    ]
};