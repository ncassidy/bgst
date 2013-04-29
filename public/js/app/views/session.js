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
        initialize: function(){
            var _this = this;
            this.sessionCollection = new SessionCollection();

            this.sessionCollection.on('session-loaded', function(sessionID){
                _this.displaySession(sessionID);
            });
        },
        render: function(sessionID){
            this.getSession(sessionID);
        },
        getSession: function(sessionID){
            var _this = this;

            if(typeof this.sessionCollection.get({id: sessionID}) === 'undefined'){
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
        displaySession: function(sessionID){
            var compiledTemplate = _.template(SessionTemplate, this.sessionCollection.get({id: sessionID}).toJSON());
            this.$el.addClass('content-overlay');
            this.$el.find('.section').append(compiledTemplate);
        },
        closeSession: function(){
            this.$el.find('#activity, .activity-overlay').remove();
            this.$el.removeClass('content-overlay');
            window.history.back();
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