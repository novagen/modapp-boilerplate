var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./webpack.config.js');

const app = express();
const port = 8000;

const middleware = webpackMiddleware(webpack(webpackConfig), {
	publicPath: webpackConfig.output.publicPath,
	contentBase: 'src',
	stats: {
		colors: true,
		hash: false,
		timings: true,
		chunks: false,
		chunkModules: false,
		modules: false
	}
});

app.use(middleware);

app.get('*', function response(req, res) {
	var file = path.join(__dirname, 'build/index.html');
	res.write(middleware.fileSystem.readFileSync(file));
	res.end();
});

app.listen(port, '0.0.0.0', function onStart(err) {
	if (err) {
		console.error(err);
	}
	console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});