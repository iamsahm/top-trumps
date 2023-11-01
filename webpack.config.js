const path = require("path");

module.exports = {
    entry: "./src/run.js", // replace with the path to your main JavaScript file
    watch: true, // automatically rebuild
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    target: "web", // specify the target environment
};
