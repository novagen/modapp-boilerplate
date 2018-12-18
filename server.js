import { join } from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig, { output } from './webpack.config.js';

var app = express();

const port = 8000;

var compiler = webpack(webpackConfig);
var middleware = webpackMiddleware(compiler, {
	publicPath: output.publicPath,
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
	var file = join(__dirname, 'build/index.html');
	res.write(middleware.fileSystem.readFileSync(file));
	res.end();
});

app.listen(port, '0.0.0.0', function onStart(err) {
	if (err) {
		console.error(err);
	}
	console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});