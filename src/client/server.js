'use strict'

const connect = require('connect');
const serveStatic = require('serve-static');

var port = 80;
var hostname = 'localhost';
connect()
	.use(serveStatic(__dirname))
	.listen(
		port,
		hostname,
		() => console.log(
			'Server running on http://' + hostname + ':' + port + '...'
		)
	).on('error', (err) => {
		port = 4000;
		connect()
			.use(serveStatic(__dirname))
			.listen(
				port,
				hostname,
				() => console.log(
					'Server running on http://' + hostname + ':' + port + '...'
				)
			);
	});