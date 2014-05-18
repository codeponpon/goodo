/*global define*/

define([
  'jquery',
  'backbone',
  'views/app'
], function ($, Backbone, AppView) {
  'use strict';

  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      '#about': 'about',
      '#contact': 'contact'
    },

    index: function(){
      console.log('Index');
    },

    about: function(){
    },

    contact: function(){
    }
  });

  return Router;
});
