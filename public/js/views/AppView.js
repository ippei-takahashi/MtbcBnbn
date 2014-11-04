define([
	"jquery",
	"underscore",
	"backbone",
	"collections/RoomList",
	"models/Room",
	"views/RoomView"
], function($, _, Backbone, RoomList, Room, RoomView) {
	"usestrict";
	return Backbone.View.extend({
		render: function() {
			$("select").select2();
			var $roomList = $("#room_list");
			var roomList = new RoomList();
			roomList.fetch({
				success: function() {
					roomList.each(function(room) {
						//Gistデータ用Viewを使いデータを表示する
						var roomView = new RoomView({
							model: room
						});
						$roomList.append(roomView.render().el);
					});
				}
			});
		}
	});
});