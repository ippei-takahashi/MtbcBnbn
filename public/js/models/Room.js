define([
		"jquery",
		"underscore",
		"backbone"
	],
	function($, _, Backbone) {

		"use strict";

		return Backbone.Model.extend({
			defaults: function() {
				return {
					userId: "",
					title: "",
					station: "",
					img: "",
					place: "",
					arrangement: "",
					description: "",
					uploadDate: ""
				};
			},
			idAttribute: "_id",
			urlRoot: "/room"
		});
	});