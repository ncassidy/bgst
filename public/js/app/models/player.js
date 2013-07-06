define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    Backbone.emulateHTTP = true;

    var PlayerModel = Backbone.Model.extend({
        defaults: {
            id: undefined,
            name: undefined
        },
        url: '',
        initialize: function(params){
            this.url = params.url;
        }
    });

    return PlayerModel;
});