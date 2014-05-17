/*global define*/

define([
    'underscore',
    'backbone',
    'models/goodo'
], function (_, Backbone, GoodoListModel) {
    'use strict';

    var GoodoListCollection = Backbone.Collection.extend({
        model: GoodoListModel
    });

    return GoodoListCollection;
});
