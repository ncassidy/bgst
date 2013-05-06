define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    Backbone.emulateHTTP = true;

    var UserModel = Backbone.Model.extend({
        defaults: {
            email: undefined,
            first_name: undefined,
            last_name: undefined,
            state: undefined,
            country: undefined
        },
        url: 'api/v1/account/login',
        data: {
            username: undefined,
            password: undefined
        }
    });

    return UserModel;
});