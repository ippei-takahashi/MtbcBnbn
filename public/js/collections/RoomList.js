define([
	"jquery",
	"underscore",
	"backbone",
	"models/Room"
	],
	function($, _, Backbone, Room) {

		"use strict";

		return Backbone.Collection.extend({
			url: "/room",
			model: Room
		});
	});