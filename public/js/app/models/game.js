define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    Backbone.emulateHTTP = true;

    var GameModel = Backbone.Model.extend({
        defaults: {
            id: undefined,
            title: undefined
        },
        url: '',
        initialize: function(params){
            this.url = params.url;
        }
    });

    return GameModel;
});