define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    Backbone.emulateHTTP = true;

    var GameModel = Backbone.Model.extend({
        defaults: {
            title: undefined
        },
        url: ''
    });

    return GameModel;
});