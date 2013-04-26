define([
    'jquery',
    'underscore',
    'backbone',
    'app/collections/session',
    'app/models/user',
    'text!/../templates/session-template.html',
    'text!/../templates/nav-template.html',
    'text!/../templates/error-modal-template.html'
], function($, _, Backbone, SessionCollection, UserModel, SessionTemplate, NavTemplate, ErrorTemplate){
    var LandingView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click .session': 'selectSession',
            'click .close': 'closeSession',
            'click .activity-overlay': 'closeSession',
            'click #login-submit': 'getLoginCreds'
        },
        viewHelpers: {
            textTruncate: function(text, limit){
                return text.substr(0, limit).substr(0, Math.min(text.length, text.lastIndexOf(" "))) + '...';
            }
        },
        initialize: function(){
            this.sessionsCollection = new SessionCollection();
            this.sessionCollection = new SessionCollection();
        },
        selectSession: function(e){
            e.preventDefault();

            var sessionID = $(e.currentTarget).data('id');
            this.getSession(sessionID);
        },
        getSession: function(sessionID){
            var _this = this;

            if(this.sessionCollection.where({id: sessionID}).length === 0){
                this.sessionCollection.fetch({
                    url: 'api/v1/sessions/' + sessionID,
                    success: function(){
                        _this.displaySession(sessionID);
                    },
                    error: function(){
                        _this.displayError(arguments[1].responseText.replace(/"/g,''));
                    }
                });
            } else {
                this.displaySession(sessionID);
            }
        },
        displaySession: function(sessionID){
            var compiledTemplate = _.template(SessionTemplate, this.sessionCollection.get({id: sessionID}).toJSON());
            this.$el.addClass('content-overlay');
            this.$el.find('.section').append(compiledTemplate);
            Router.navigate('sessions/' + sessionID, {trigger: false});
        },
        closeSession: function(){
            this.$el.find('#activity, .activity-overlay').remove();
            this.$el.removeClass('content-overlay');
            Router.navigate('', {trigger: false});
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