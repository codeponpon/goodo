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
    header: JST['app/scripts/templates/header.ejs'],
    template: JST['app/scripts/templates/app.ejs'],
    footer: JST['app/scripts/templates/footer.ejs'],

    events: {},

    initialize: function () {
      // this.listenTo(GoodoList, 'all', this.render);
      this.$content = $('.content');
      this.$header = $('.header');
      this.$footer = $('.footer');
      this.render();
    },

    render: function () {
      this.$header.append(this.header(Common));
      this.$content.append(this.template(GoodoList.toJSON()));

      this.$footer.append(this.footer);
    }
  });

  return AppView;
});
