/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'common'
], function ($, _, Backbone, JST, Common) {
  'use strict';

  var NavBar = Backbone.View.extend({
    initialize:function(options){
      Common.menuActive = _.isEmpty(Backbone.history.fragment) ? 'index' : Backbone.history.fragment;
      this.$el.html(this.header.render(Common));
      Backbone.history.on('route',function(source, path){
        this.render(path);
      }, this);
    },

    header: new EJS({url: 'scripts/templates/header.ejs'}),

    //This is a collection of possible routes and their accompanying
    //user-friendly titles
    titles: {
      "index":"Home",
      "about":"About"
    },

    events:{
      'click a':function(source) {
        var hrefRslt = source.target.getAttribute('href');
        console.log(hrefRslt);
        Backbone.history.navigate(hrefRslt, {trigger:true});
        //Cancel the regular event handling so that we won't actual change URLs
        //We are letting Backbone handle routing
        return false;
      }
    },
    //Each time the routes change, we refresh the navigation
    //items.
    render:function(route){
      this.$el.empty();
      var template = _.template("<li class='<%=active%>'><a href='#<%=url%>'><%=visible%></a></li>");
      for (var key in this.titles)
      {
        console.log(route);
        console.log(key);
        this.$el.append(template({url:key,visible:this.titles[key],active:route === key ? 'active' : ''}));
      }

      return this;
    }
  });

  return NavBar;
});
