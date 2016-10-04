const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = {
	entry: {
		app: path.join(__dirname, 'src/app.ts')
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.tsx?$/, loader: 'awesome-typescript?doTypeCheck=false' },
			{ test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file?name=[name].[ext]!image-webpack' }
		]
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
	},
	externals: {
		phaser: 'window.Phaser'
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: path.join(__dirname, 'node_modules/phaser/build/phaser.min.js') },
			{ from: path.join(__dirname, 'src/index.html') }
		], { 
			flatten: true 
		})
	]
}
