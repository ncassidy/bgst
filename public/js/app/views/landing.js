define([
    'jquery',
    'underscore',
    'backbone',
    'app/collections/session',
    'app/models/user',
    'text!/../templates/nav-template.html',
    'text!/../templates/error-modal-template.html'
], function($, _, Backbone, SessionCollection, UserModel, NavTemplate, ErrorTemplate){
    var LandingView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click #login-submit': 'getLoginCreds'
        },
        viewHelpers: {
            textTruncate: function(text, limit){
                return text.substr(0, limit).substr(0, Math.min(text.length, text.lastIndexOf(" "))) + '...';
            }
        },
        initialize: function(){
            this.sessionsCollection = new SessionCollection();
        },
        getLoginCreds: function(e){
            e.preventDefault();

            var username = this.$el.find('#login-username').val();
            var password = this.$el.find('#login-password').val();

            this.loginUser(username, password);
        },
        loginUser: function(username, password){
            var _this = this;

            this.userModel = new UserModel();
            this.userModel.fetch({
                type: 'POST',
                data:{
                    email: username,
                    password: password
                },
                success: function(){
                    var compiledTemplate = _.template(NavTemplate);
                    _this.$el.find('#nav-options').append(compiledTemplate);
                },
                error: function(){
                    _this.displayError(arguments[1].responseText.replace(/"/g,''));
                }
            });
        },
        displayError: function(errorMessage){
            var compiledTemplate = _.template(ErrorTemplate, {error: errorMessage});
            this.$el.append(compiledTemplate);

            this.$el.find('.error-ok, .error-close').on('click', function(){
                window.location = '/';
            });
        }
    });

    return LandingView;
});