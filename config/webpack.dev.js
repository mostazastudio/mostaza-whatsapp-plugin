const path = require("path/posix");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

/** @type {import('webpack').Configuration}*/
const devConfig = {
    mode:"development",
    devServer: {
        port:3000,
        watchFiles: "../dist",
        open: true
    },
    module:{
        rules:[
                {
                    use:["style-loader","css-loader"],
                    test:/.(css)$/,
                }
        ]
    }
}

module.exports = merge(common, devConfig)