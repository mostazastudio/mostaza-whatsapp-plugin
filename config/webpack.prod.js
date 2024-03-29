const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const { plugins } = require("./webpack.common");
const common = require("./webpack.common");

/** @type {import('webpack').Configuration}*/
const prodConfig = {
    mode:"production",
    optimization:{
        splitChunks:{
            chunks:"all",
        }
    },
    plugins:[ new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css"
    })],
    module:{
        rules:[{
            use:[MiniCssExtractPlugin.loader, "css-loader"],
            test:/.(css)$/
        }/*,
        {
            type: "asset",    
            test:/\.(svg)$/i,
        }*/
    
    ]
    }
}

module.exports = merge(common, prodConfig)