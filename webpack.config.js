var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    // The standard entry point and output config
    entry: {
        app: "./app/app.js",
    },
    output: {
        filename: "./build/app.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("css-loader!sass-loader")
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin("./build/style.css")
    ]
}
