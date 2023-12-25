module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    chrome: "44",
                    ie: "5"
                }
            }
        ]
    ]
};