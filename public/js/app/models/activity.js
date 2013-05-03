define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    Backbone.emulateHTTP = true;

    var ActivityModel = Backbone.Model.extend({
        defaults: {
            id: undefined,
            session_title: undefined,
            date: undefined,
            summary: undefined
        },
        url: '',
        initialize: function(params){
            this.url = params.url;
        }
    });

    return ActivityModel;
});