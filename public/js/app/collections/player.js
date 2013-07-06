define([
    'jquery',
    'underscore',
    'backbone',
    'app/models/player'
], function($, _, Backbone, PlayerModel){
    var PlayerCollection = Backbone.Collection.extend({
        model: PlayerModel,
        url: '/api/v1/players'
    });

    return PlayerCollection;
});