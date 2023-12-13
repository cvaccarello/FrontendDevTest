
const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
	const isDevelopment = env.development || true;
	const mode = isDevelopment ? 'development' : 'production';

	return {
		mode,
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
							presets: [
								'@babel/preset-env',
								[
									'@babel/preset-react', {
										// need this to enable React w/o needing to explicitly import react in the JS, I believe
										'runtime': 'automatic'
									}
								]
							]
						}
					}
				},
				{
					test: /\.(sc|sa|c)ss$/i,
					use: [ 'style-loader', 'css-loader', 'sass-loader' ],
				},
				{
					test: /\.svg$/,
					use: [ 'svg-url-loader' ],
				},
			]
		},
		plugins: [
			new Dotenv({
				path: `./.env.${mode}`
			}),
			new HtmlWebpackPlugin({
				template: path.join(__dirname, 'public', 'index-webpack.html'),
			}),
		],
		optimization: {
			minimize: !isDevelopment,
		},
	}
};
