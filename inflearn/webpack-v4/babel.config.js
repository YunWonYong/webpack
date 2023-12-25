module.exports = {
    // plugins: [
    //     "@babel/plugin-syntax-dynamic-import"
    // ],
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    chrome: "44",
                    ie: "5",
                    node: "13.14.0",
                },
                useBuiltIns: "usage", // entry or usage
                corejs: {
                    version: 2
                }
            }
        ]
    ]
};