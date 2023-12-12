
const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDevelopment = process.env.NODE_ENV || true;

module.exports = {
	mode: isDevelopment ? 'development' : 'production',
	entry: {
		'main': `./src/index.js`,
	},
	output: {
		filename: '[name].min.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env', '@babel/preset-react' ]
					}
				}
			},
			{
				test: /\.css$/i,
				use: [ 'style-loader', 'css-loader' ],
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			},
		]
	},
	plugins: [
		new Dotenv(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'public', 'index.html'),
		}),
	],
	optimization: {
		minimize: !isDevelopment,
	},
};
