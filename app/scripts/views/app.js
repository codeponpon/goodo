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
     * Instead of generating a new element, bind to the existing skeleton of the App already present in the HTML.
     */
    el: '#todoapp',

    /**
     * Application Template
     */
    template: {
      app: new EJS({url: 'scripts/templates/app.ejs'}),
      about: new EJS({url: 'scripts/templates/about.ejs'})
    },

    footer   : JST['app/scripts/templates/footer.ejs'],

    /**
     * Delegated events for creating new items, and clearing completed ones.
     */
    events: {
      'keypress #new-goodo': 'createOnEnter'
    },

    initialize: function () {
      this.allCheckbox = this.$('#toggle-all')[0];
      this.$content    = this.$('.content');
      this.$footer     = this.$('.footer');
      this.$input      = this.$('#new-goodo');
      Backbone.history.on('route',function(source, path){
        this.render(path);
      }, this);
      this.render();
    },

    /**
     * Add a single todo item to the list by creating a view for it, and appending its element to the `<ul>`.
     */
    addOne: function(goodo){
      var view = new GoodoView({ model: goodo });
      $('#goodo-list').append( view.render().el );
    },


    /**
     * Add all items in the **Todos** collection at once.
     */
    addAll: function(){
      this.$('godo-list').html('');
      GoodoList.each(this.addOne, this);
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
    },

    /**
     * Generate the attributes for a new Todo item.
     */
    newAttributes: function() {
      return {
        title: this.$input.val().trim(),
        order: GoodoList.nextOrder(),
        completed: false
      };
    },

    /**
     * If you hit return in the main input field, create new Todo model, persisting it to localStorage.
     */
    createOnEnter: function( event ) {
      if ( event.which !== Common.enter_key || !this.$input.val().trim() ) {
        return;
      }

      GoodoList.create( this.newAttributes() );
      this.$input.val('');
    }

  });

  return AppView;
});
