'use strict';
var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require('fs');

var includePaths = [
	fs.realpathSync(__dirname + '/src')
];

var moduleConfigPath = path.join(__dirname, 'src/module.config.local.js');
if (!fs.existsSync(moduleConfigPath)) {
	moduleConfigPath = path.join(__dirname, 'src/module.config.js');
}
var alias = {
	'module.config': moduleConfigPath
};
var aliasPath = path.join(__dirname, 'webpack.alias.js');
if (fs.existsSync(aliasPath)) {
	let aliasFile = require(aliasPath);
	for (var mod in aliasFile) {
		alias[mod] = path.resolve(__dirname, aliasFile[mod]);
	}
}

module.exports = {
	mode: "development",
	devtool: 'eval-source-map',
	entry: {
		app: path.join(__dirname, 'src/main.js')
	},
	output: {
		path: path.join(__dirname, '/build/'),
		filename: '[name].js'
	},
	resolve: {
		alias: alias,
		modules: [
			'node_modules',
			path.resolve('./src')
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: 'body',
			filename: 'index.html'
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				eslint: {
					configFile: './.eslintrc'
				}
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				include: includePaths,
				loader: 'babel-loader'
			},
			{
				test: /\.js$/,
				include: includePaths,
				loader: 'eslint-loader'
			},
			{
				test: /\.(css)$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(otf|eot|svg|ttf|woff)/,
				loader: 'url-loader?limit=8192'
			},
			{
				test: /\.(scss|css)$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	}
};