/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'common',
    'collections/goodoList',
    'views/goodoView'
], function ($, _, Backbone, JST, Common, GoodoList, GoodoView) {
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
      app   : new EJS({url: 'scripts/templates/app.ejs'}),
      about : new EJS({url: 'scripts/templates/about.ejs'}),
      item  : new EJS({url: 'scripts/templates/item.ejs'}),
      stats : new EJS({url: 'scripts/templates/stats.ejs'})
    },

    footer   : JST['app/scripts/templates/footer.ejs'],

    /**
     * Delegated events for creating new items, and clearing completed ones.
     */
    events: {
      'keypress #new-goodo'    : 'createOnEnter',
      'click #clear-completed' : 'clearCompleted',
      'click #toggle-all'      : 'toggleAllComplete'
    },

    initialize: function () {
      this.allCheckbox = this.$('#toggle-all')[0];
      this.$content    = this.$('.content');
      this.$footer     = this.$('#footer');
      this.$input      = this.$('#new-goodo');
      this.$main       = this.$('#main');

      this.listenTo(GoodoList, 'add', this.addOne);
      this.listenTo(GoodoList, 'reset', this.addAll);

      this.listenTo(GoodoList, 'change:completed', this.filterOne);
      this.listenTo(GoodoList, 'filter', this.filterAll);
      this.listenTo(GoodoList, 'all', this.render);

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
      this.$('#header').prepend('<h1>'+Common.appName+'</H1>');
      // if(path === undefined){
      //   path = Backbone.history.fragment;
      // }
      // switch(path){
      //   case 'about':
      //     this.$content.html(this.template.about.render(GoodoList.toJSON()));
      //     break;
      //   default:
      //     this.$content.html(this.template.app.render(GoodoList.toJSON()));
      //     break;
      // }

      // Footer
      // this.$footer.html(this.footer);

      var completed = GoodoList.completed().length;
      var remaining = GoodoList.remaining().length;
      if ( GoodoList.length ) {
        this.$main.show();
        this.$footer.show();

        this.$footer.html(this.template.stats.render({
          completed: completed,
          remaining: remaining
        }));

        this.$('#filters li a')
          .removeClass('selected')
          .filter('[href="#/' + ( Common.TodoFilter || '' ) + '"]')
          .addClass('selected');
      } else {
        this.$main.hide();
        this.$footer.hide();
      }

      this.allCheckbox.checked = !remaining;
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
    },

    filterOne : function (goodo) {
      goodo.trigger('visible');
    },

    filterAll : function () {
      GoodoList.each(this.filterOne, this);
    },

    /**
     * Clear all completed todo items, destroying their models.
     */
    clearCompleted: function() {
      _.invoke(GoodoList.completed(), 'destroy');
      return false;
    },

    toggleAllComplete: function() {
      var completed = this.allCheckbox.checked;

      GoodoList.each(function( goodo ) {
        goodo.save({
          'completed': completed
        });
      });
    }

  });

  return AppView;
});
