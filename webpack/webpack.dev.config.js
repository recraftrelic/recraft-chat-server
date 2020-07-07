var webpack = require('webpack')
var path = require('path')
const { watch } = require('less')


module.exports = {
    entry: 'index.js', 
    module: {
		loaders: [{
			test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},{
				test: /\.less$/,
				loaders: ["style-loader", "css-loader", "less-loader"]
			}
		]
    }, 
    output: { 
        filename:'bundle.js'
    }, 
    devServer : {
        contentBase: '../', 
        historyApiFallback: true 
    },
    watch: true
}