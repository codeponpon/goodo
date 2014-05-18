/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'common',
    'collections/goodoList'
], function ($, _, Backbone, JST, Common, GoodoList) {
  'use strict';

  var AppView = Backbone.View.extend({
    /**
     * Application Template
     */
    header: new EJS({url: 'scripts/templates/header.ejs'}),
    template: JST['app/scripts/templates/app.ejs'],
    footer: JST['app/scripts/templates/footer.ejs'],

    events: {},

    initialize: function () {
      this.$content = $('.content');
      this.$header = $('.header');
      this.$footer = $('.footer');
      Backbone.history.on('route',function(source, path){
        this.render(path);
      }, this);
      this.render();
    },

    render: function (path) {
      this.$content.html(this.template(GoodoList.toJSON()));
      this.$footer.html(this.footer);
    }
  });

  return AppView;
});
