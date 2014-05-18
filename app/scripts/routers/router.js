/*global define*/

define([
  'jquery',
  'backbone',
  'views/app'
], function ($, Backbone, AppView) {
  'use strict';

  var Workspace = Backbone.Router.extend({
    routes: {
      'index': 'index',
      'about': 'about'
    },

    index: function(){
    },

    about: function(){
    }
  });

  return Workspace;
});
