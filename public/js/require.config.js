"use strict"

require.config({
	baseUrl: "js",
	paths: {
		"jquery": "libs/jquery-2.1.0",
		"jquery-ui": "libs/jquery-ui",
		"jquery-ui-iframe": "libs/jquery-ui-droppable-iframe-fix",
		"underscore": "libs/underscore",
		"backbone": "libs/backbone",
		"bootstrap": "libs/bootstrap.min",
		"bootstrap-select": "libs/bootstrap-select",
		"fratui-checkbox": "libs/flatui-checkbox",
		"fratui-fileinput": "libs/flatui-fileinput",
		"fratui-radio": "libs/flatui-radio",
		"keymaster": "libs/keymaster"
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
		"bootstrap": {
			deps: ["jquery"]
		},
		"bootstrap-select": {
			deps: ["bootstrap"],
			exports: "bootstrapSelect"
		},
		"fratui-checkbox": {
			deps: ["bootstrap"],
			exports: "fratuiCheckbox"
		},
		"fratui-fileinput": {
			deps: ["bootstrap"],
			exports: "fratuiFileinput"
		},
		"fratui-radio": {
			deps: ["bootstrap"],
			exports: "fratuiRadio"
		}
	}
});

require([
	"views/AppView",
	"jquery",
	"jquery-ui",
	"jquery-ui-iframe",
	"underscore",
	"backbone",
	"bootstrap",
	"bootstrap-select",
	"fratui-checkbox",
	"fratui-fileinput",
	"fratui-radio",
	"growui-switch",
	"keymaster"
], function(AppView, $, jQueryUI, jQueryUIIframe, _, Backbone, bootstrap, bootstrapSelect, flatuiCheckbox, flatuiFileinput, flatuiRadio, keymaster) {
	$(document).ready(function() {
		new AppView({
			el: "body"
		}).render();
	});
});