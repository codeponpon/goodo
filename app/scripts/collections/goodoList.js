/*global define*/

define([
    'underscore',
    'backbone',
    'localstorage',
    'models/goodo'
], function (_, Backbone, Storage, Goodo) {
    'use strict';

    var GoodoList = Backbone.Collection.extend({
      model: Goodo,
      localStorage: new Storage('goodos-data')
    });

    return new GoodoList();
});
