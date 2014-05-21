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
    template: {
      app: new EJS({url: 'scripts/templates/app.ejs'}),
      about: new EJS({url: 'scripts/templates/about.ejs'})
    },
    footer   : JST['app/scripts/templates/footer.ejs'],

    events   : {},

    initialize: function () {
      this.$content = $('.content');
      this.$footer = $('.footer');
      Backbone.history.on('route',function(source, path){
        this.render(path);
      }, this);
      this.render();
    },

    render: function (path) {
      if(path === undefined){
        path = Backbone.history.fragment;
      }
      switch(path){
        case 'about':
          this.$content.html(this.template.about.render(GoodoList.toJSON()));
          break;
        default:
          this.$content.html(this.template.app.render(GoodoList.toJSON()));
          break;
      }

      // Footer
      this.$footer.html(this.footer);
    }
  });

  return AppView;
});
