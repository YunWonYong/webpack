module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    chrome: "44",
                    ie: "5"
                },
                useBuiltIns: "usage", // entry or usage
                corejs: {
                    version: 2
                }
            }
        ]
    ]
};