define([
    'jquery',
    'underscore',
    'backbone',
    'app/collections/session',
    'text!/../templates/session-template.html',
    'text!/../templates/error-modal-template.html'
], function($, _, Backbone, SessionCollection, SessionTemplate, ErrorTemplate){
    var SessionView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click .activity-overlay': "closeSession",
            'click .close': "closeSession"
        },
        initialize: function(sessionID){
            var _this = this,
                sessionID = sessionID.sessionID;

            this.sessionCollection = new SessionCollection();
            this.getSession(sessionID);
            this.sessionCollection.on('session-loaded', function(sessionID){
                _this.render(sessionID);
            });
        },
        render: function(sessionID){
            var compiledTemplate = _.template(SessionTemplate, this.sessionCollection.get({id: sessionID}).toJSON());
            this.$el.addClass('content-overlay');
            this.$el.find('.section').append(compiledTemplate);
        },
        closeSession: function(){
            this.$el.find('#activity, .activity-overlay').remove();
            this.$el.removeClass('content-overlay');
            this.undelegateEvents();
            Router.navigate('', {trigger: true});
        },
        getSession: function(sessionID){
            var _this = this;

            if(this.sessionCollection.where({id: sessionID}).length === 0){
                this.sessionCollection.fetch({
                    url: 'api/v1/sessions/' + sessionID,
                    success: function(){
                        _this.sessionCollection.trigger('session-loaded', sessionID);
                    },
                    error: function(){
                        _this.displayError(arguments[1].responseText.replace(/"/g,''));
                    }
                });
            } else {
                this.sessionCollection.trigger('session-loaded', sessionID);
            }
        },
        displayError: function(errorMessage){
            var compiledTemplate = _.template(ErrorTemplate, {error: errorMessage});
            this.$el.append(compiledTemplate);

            this.$el.find('.error-ok, .error-close').on('click', function(){
                window.location = '/';
            });
        }
    });

    return SessionView;
});