define([
    'jquery',
    'underscore',
    'backbone',
    'app/models/activity'
], function($, _, Backbone, ActivityModel){
    var ActivityCollection = Backbone.Collection.extend({
        model: ActivityModel,
        url: '/api/v1/activity/recent'
    });

    return ActivityCollection;
});