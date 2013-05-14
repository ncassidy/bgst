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
            this.sessionCollection = new SessionCollection();
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
            this.$el.find('#section').append(compiledTemplate);
            this.$el.find('#activity').animate({opacity: 1}, 200);
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