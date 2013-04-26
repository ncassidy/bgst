define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    Backbone.emulateHTTP = true;

    var SessiontModel = Backbone.Model.extend({
        defaults: {
            id: undefined,
            session_title: undefined,
            date: undefined,
            game_title: undefined,
            summary: undefined,
            users: undefined,
            players: undefined
        },
        url: '',
        initialize: function(params){
            this.url = params.url;
        }
    });

    return SessiontModel;
});