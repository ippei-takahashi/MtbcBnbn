"use strict"

require.config({
	baseUrl: "js",
	paths: {
		"jquery": "libs/jquery-2.1.0",
		"jquery-ui": "libs/jquery-ui",
		"jquery-ui-iframe": "libs/jquery-ui-droppable-iframe-fix",
		"underscore": "libs/underscore",
		"backbone": "libs/backbone",
		"flat-ui": "libs/flat-ui"
	},
	shim: {
		"jquery": {
			exports: "$"
		},
		"jquery-ui": {
			deps: ["jquery"],
			exports: "jQueryUI"
		},
		"jquery-ui-iframe": {
			deps: ["jquery-ui"],
			exports: "jQueryUIIframe"
		},
		"underscore": {
			exports: "_"
		},
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		"flat-ui": {
			deps: ["jquery"],
			exports: "flatUI"
		},
	}
});

require([
	"views/AppView",
	"jquery",
	"jquery-ui",
	"jquery-ui-iframe",
	"underscore",
	"backbone",
	"flat-ui"
], function(AppView, $, jQueryUI, jQueryUIIframe, _, Backbone, flatUI) {
	$(document).ready(function() {
		new AppView({
			el: "body"
		}).render();
	});
});