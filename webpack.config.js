const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV ? process.env.NODE_ENV : "production";

module.exports = {
    mode: mode,
    entry: "./src/run.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    target: "web",
    devServer: {
        static: {
            directory: path.join(__dirname, "src"),
            watch: true,
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.HTML",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "./src/images/favicon.ico"),
                    to: "favicon.ico",
                },
            ],
        }),
    ],
};
