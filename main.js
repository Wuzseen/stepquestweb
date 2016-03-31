var http = require('http');
var url = require('url');
var FitbitApiClient = require("fitbit-node");

var fbitCli = new FitbitApiClient("227NJ8","ad6c7dead0c80c08ee245d00cfedf347");

var server = http.createServer(
        function (request, response) {
        	var path = url.parse(request.url).pathname;
        	console.log('request received for: ' + path);
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.end("Hello World\n");
        });


server.listen(8000);
console.log('Server listening on port 8000');