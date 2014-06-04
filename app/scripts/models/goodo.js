/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var Goodo = Backbone.Model.extend({

    /**
     * Default attributes ensure that each todo created has `title` and `completed` keys.
     */
    defaults: {
      title: '',
      completed: false
    },

    /**
     * Toggle the `completed` state of this todo item.
     */
    toggle: function(){
      this.save({
        completed: !this.get('completed')
      });
    }
  });

  return Goodo;
});
