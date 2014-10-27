var http = require("http"),
	express = require("express"),
	socketIO = require('socket.io'),
	routes = require("./routes"),
	app = express();

app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + "/public"));
	app.use(app.router);
});

routes.configRoutes(app, server);

server.listen(3000);