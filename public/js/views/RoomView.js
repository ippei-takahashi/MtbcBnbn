define([
    "jquery",
    "underscore",
    "backbone"
  ],
  function($, _, Backbone) {

    "use strict";

    var $houseImgwrapper = null;

    return Backbone.View.extend({
      render: function() {
        //日時を設定
        this.$el.append($("<div>").attr("class", "house-time").text(this.model.get("uploadDate")));
        //タイトル設定
        this.$el.append($("<div>").attr("class", "house-title").text(this.model.get("title")));
        //img設定
        $houseImgwrapper = $("<div />").addClass("house-img");
        $houseImgwrapper.append($("<img>").attr({
          "src": "img/"+ this.model.get("img"),
          "height": 120,
          "width" : 180,
          "alt"   : "家",
          "align" : "left"
        }));
        this.$el.append($houseImgwrapper);
        this.$el.append($("<div>").attr("class", "house-description")
          .html("場所:"+this.model.get("place")+
                "<br />最寄り駅:"+this.model.get("station")+
                "<br />間取り:"+this.model.get("arrangement")+
                "<br />説明:"+this.model.get("description")+
                "<br /><a href='#''>>>詳細はこちら</a>"));
        return this;
      },
      tagName: "li"
    });
  });
