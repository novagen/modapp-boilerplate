let path = require('path');
let express = require('express');
let webpack = require('webpack');
let webpackMiddleware = require('webpack-dev-middleware');
let webpackConfig = require('./webpack.config.js');

let app = express();

const port = 8888;

let compiler = webpack(webpackConfig);
let middleware = webpackMiddleware(compiler, {
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
	console.info("GET: ", req.url);
	let file = path.join(__dirname, 'build/index.html');
	res.write(middleware.fileSystem.readFileSync(file));
	res.end();
});

// // Load all microservices
// let normalizedPath = require("path").join(__dirname, "microservice");
// require("fs").readdirSync(normalizedPath).forEach(function(file) {
// 	console.info('Loading service ' + file);
// 	require("./microservice/" + file);
// });

app.listen(port, '0.0.0.0', function onStart(err) {
	if (err) {
		console.error(err);
	}
	console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});


