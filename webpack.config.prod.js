const webpack = require('webpack'),
	path = require('path'),
	{ CleanWebpackPlugin } = require('clean-webpack-plugin'),
	TerserPlugin = require('terser-webpack-plugin'),
	ESLintPlugin = require('eslint-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	environment = process.env.NODE_ENV || 'development';

const config = {
	name: 'template',
	entry: {
		app: './src/index.tsx'
	},
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'build.[name].js',
		chunkFilename: 'build.[id].chunk.js',
		publicPath: ''
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.sass$/,
				use: [
					{ loader: 'style-loader', options: { injectType: 'styleTag' } },
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|woff|woff2|otf|eot|ttf|svg|jpg|jpeg|gif)$/,
				loader: 'file-loader'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.sass', '.css']
	},
	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: 1000,
			minChunks: 2,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: false
		},
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true,
				extractComments: "all"
			}),
		],
	},
	performance: {
		hints: false
	},
	mode: environment,
	plugins: [
		new ESLintPlugin(),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				collapseWhitespace: true,
				preserveLineBreaks: true
			},
			inject: 'body'
		}),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(process.env)
		})
	]
};

module.exports = config;
