var
	configRoutes,
	mongodb = require("mongodb"),
	mongoServer = new mongodb.Server("localhost", mongodb.Connection.DEFAULT_PORT),
	dbHandle = new mongodb.Db("mtbcbnbn", mongoServer, {
		safe: true
	}),
	makeMongoId = mongodb.ObjectID;

dbHandle.open(function() {});

configRoutes = function(app, server) {
	app.get("/", function(request, response) {
		response.redirect("/index.html");
	});


	app.get("/room/:id", function(request, response) {
		dbHandle.collection(
			"room",
			function(outerError, collection) {
				var
					findMap = {
						_id: makeMongoId(request.params.id)
					},
					optionsMap = {};

				collection.find(
					findMap,
					optionsMap
				).toArray(
					function(innerError, mapList) {
						response.send(mapList ? mapList[0] : null);
					});
			});
	});

	app.get("/room", function(request, response) {
		dbHandle.collection(
			"room",
			function(outerError, collection) {
				var
					findMap = {},
					optionsMap = {};

				collection.find(
					findMap,
					optionsMap
				).toArray(
					function(innerError, mapList) {
						response.send(mapList);
					});
			});
	});


	app.post("/room", function(request, response) {
		dbHandle.collection(
			"room",
			function(outerError, collection) {
				var
					objMap = request.body,
					optionsMap = {};

				collection.insert(
					objMap,
					optionsMap,
					function(innerError, mapList) {
						response.send(mapList ? mapList[0] : null);
					});
			});
	});


	app.put("/room/:id", function(request, response) {
		dbHandle.collection(
			"component",
			function(outerError, collection) {
				var
					findMap = {
						_id: makeMongoId(request.params.id)
					},
					objMap = request.body,
					optionsMap = {
						"new": true,
						upsert: true
					},
					sortOrder = [];

				objMap._id = makeMongoId(request.params.id);

				collection.findAndModify(
					findMap,
					sortOrder,
					objMap,
					optionsMap,
					function(innerError, mapList) {
						response.send(mapList);
					});
			});
	});
};

module.exports = {
	configRoutes: configRoutes
};