define([
    'jquery',
    'underscore',
    'backbone',
    'app/collections/session',
    'text!/../templates/session-template.html'
], function($, _, Backbone, SessionCollection, SessionTemplate){
    var SessionView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click .activity-overlay': "closeSession",
            'click .close': "closeSession"
        },
        sessionCollection: undefined,
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
            window.history.back();
        },
        getSession: function(sessionID){
            var _this = this;

            if(this.sessionCollection.where({id: sessionID}).length === 0){
                this.sessionCollection.fetch({
                    url: 'api/v1/sessions/' + sessionID,
                    success: function(){
                        _this.sessionCollection.trigger('session-loaded', sessionID);
                    },
                    error: function(msg){
                    }
                });
            } else {
                this.sessionCollection.trigger('session-loaded', sessionID);
            }
        }
    });

    return SessionView;
});