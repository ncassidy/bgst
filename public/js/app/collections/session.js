define([
    'jquery',
    'underscore',
    'backbone',
    'app/models/session'
], function($, _, Backbone, SessionModel){
    var SessionCollection = Backbone.Collection.extend({
        model: SessionModel,
        url: '/api/v1/session'
    });

    return SessionCollection;
});