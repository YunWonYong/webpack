const path = require("path");
module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: path.resolve("./dist"),
        filename: "[name].js"
    }
};