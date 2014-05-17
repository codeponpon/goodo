/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        localstorage: {
            deps: ['backbone']
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: 'vendor/bootstrap',
        localstorage: '../bower_components/backbone.localStorage/backbone.localStorage'
    }
});

require([
    'backbone'
], function (Backbone) {
    Backbone.history.start();
    console.log('Hello from Backbone!');
});
