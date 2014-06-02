/*global define*/

define([
  'jquery',
  'backbone',
  'views/app',
  'collections/goodoList',
  'common'
], function ($, Backbone, AppView, GoodoList, Common) {
  'use strict';

  var Workspace = Backbone.Router.extend({
    routes: {
      'index': 'index',
      'about': 'about',
      '*filter': 'setFilter'
    },

    setFilter: function( param ) {
      // Set the current filter to be used
      if (param) {
        param = param.trim();
      }
      Common.TodoFilter = param || '';

      // Trigger a collection filter event, causing hiding/unhiding
      // of Todo view items
      GoodoList.trigger('filter');
    }
  });

  return Workspace;
});
