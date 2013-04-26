define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    Backbone.emulateHTTP = true;

    var UserModel = Backbone.Model.extend({
        defaults: {
            id: undefined,
            name: undefined,
            login_status : undefined
        },
        url: 'api/v1/account/login',
        data: {
            username: undefined,
            password: undefined
        }
    });

    return UserModel;
});