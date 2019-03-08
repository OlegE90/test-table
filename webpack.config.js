const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, './src/index.js'),
	output: {
		filename: 'bundle.js',
		path: path.resolve('dist')
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', '.styl', '.jsx', '.css'],
	},
	devtool: 'eval-source-map',
	stats: {
		assets: true,
		colors: true,
		errors: true,
		errorDetails: true,
		modules: false,
		performance: true,
		hash: false,
		version: false,
		timings: true,
		warnings: true,
		children: false
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|public\/)/,
				use: 'babel-loader?cacheDirectory',
			},
			{
				test: /\.tsx?$/,
				exclude: /(node_modules|public\/)/,
				use: 'ts-loader'
			},
			// Rules for Style Sheets
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'less-loader',
					}
				],
				exclude: '/node_modules/'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'image/svg+xml'
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve('src/assets/index.html'),
			filename: 'index.html',
			inject: 'body'
		})
	],
	devServer: {
		host: 'localhost',
		port: process.env.npm_package_config_port || 8090,
	}
};
