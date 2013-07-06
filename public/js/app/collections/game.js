define([
    'jquery',
    'underscore',
    'backbone',
    'app/models/game'
], function($, _, Backbone, GameModel){
    var GameCollection = Backbone.Collection.extend({
        model: GameModel,
        url: '/api/v1/games'
    });

    return GameCollection;
});