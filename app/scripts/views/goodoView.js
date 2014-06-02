/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'common',
], function ($, _, Backbone, JST, Common) {
  'use strict';

  var GoodoView = Backbone.View.extend({

    //... is a list tag.
    tagName: 'li',

    // Cache the template function for a single item.
    template: {
      item  : new EJS({url: 'scripts/templates/item.ejs'})
    },

    // The DOM events specific to an item.
    events: {
      'click .toggle': 'togglecompleted', // NEW
      'dblclick label': 'edit',
      'click .destroy': 'clear',           // NEW
      'keypress .edit': 'updateOnEnter',
      'blur .edit': 'close'
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      console.log(this.model);
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);        // NEW
      this.listenTo(this.model, 'visible', this.toggleVisible); // NEW
    },

    // Re-renders the titles of the todo item.
    render: function() {
      this.$el.html( this.template.item.render( this.model.toJSON() ) );

      this.$el.toggleClass( 'completed', this.model.get('completed') ); // NEW
      this.toggleVisible();                                             // NEW

      this.$input = this.$('.edit');
      return this;
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      this.$el.addClass('editing');
      this.$input.focus();
    },

    /**
     * Toggle the `"completed"` state of the model.
     */
    togglecompleted: function() {
      this.model.toggle();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      var value = this.$input.val().trim();

      if ( value ) {
        this.model.save({ title: value });
      }
      else {
        this.clear(); // NEW
      }

      this.$el.removeClass('editing');
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function( e ) {
      if ( e.which === Common.enter_key ) {
        this.close();
      }
    },

    /**
     * Determines if item should be hidden
     */
    isHidden : function () {
      var isCompleted = this.model.get('completed');
      return ( // hidden cases only
        (!isCompleted && Common.TodoFilter === 'completed')
        || (isCompleted && Common.TodoFilter === 'active')
      );
    },


    /**
     * Toggles visibility of item
     */
    toggleVisible : function () {
      this.$el.toggleClass( 'hidden',  this.isHidden());
    },

    /**
     * Remove the item, destroy the model from *localStorage* and delete its view.
     */
    clear: function() {
      this.model.destroy();
    }
  });

  return GoodoView;
});
