
var system = require("system");
var port = system.env['PHANTOM_WORKER_PORT'];
var host = system.env['PHANTOM_WORKER_HOST'];

require('webserver').create().listen(host + ':' + port, function (req, res) {
	//standard phantomjs script which get input parametrs from request
	var page = require('webpage').create();

	page.open(JSON.parse(req.post).url, function(status) {
    var title = page.evaluate(function() {
	    return document.title;
		});

		//write the result to the response
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
	  res.write(JSON.stringify({ title: title }));
	  res.close();
	});
});
