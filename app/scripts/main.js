/*global require*/
'use strict';

require.config({
  shim: {
    underscore   : { exports: '_' },
    backbone     : { deps: [   'underscore',   'jquery' ], exports: 'Backbone' },
    bootstrap    : { deps: ['jquery'], exports: 'jquery' },
    localstorage : { deps: ['backbone'], exports: 'Storage' }
  },
  paths: {
    jquery       : '../bower_components/jquery/jquery',
    backbone     : '../bower_components/backbone/backbone',
    underscore   : '../bower_components/underscore/underscore',
    bootstrap    : 'vendor/bootstrap',
    localstorage : '../bower_components/backbone.localStorage/backbone.localStorage',
    text         : '../bower_components/requirejs-text/text',
    embeddedjs   : 'vendor/embeddedjs/ejs_production'
  }
});

require([
  'backbone',
  'routers/router',
  'views/app',
  'embeddedjs',
], function (Backbone, Router, AppView) {
  /**
   * Initialize routing and start Backbone.history()
   */
  new Router();
  Backbone.history.start({pushState: true});

  /**
   * Initialize the application view
   */
  new AppView();
  console.log('Hello from Backbone!');
});
