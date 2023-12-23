const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        index: "./src/app.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve("./dist")
    }
};