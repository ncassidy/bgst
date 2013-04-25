define([
    'jquery',
    'underscore',
    'backbone',
    'app/models/session',
    'app/collections/session',
    'text!/../templates/session-template.html'
], function($, _, Backbone, SessionModel, SessionCollection, SessionTemplate){
    var ActivityView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click .session': "selectSession",
            'click .activity-overlay': "closeSession",
            'click .close': "closeSession"
        },
        activityCollection: undefined,
        initialize: function(){
            var _this = this;

            this.activityCollection = new SessionCollection();
            this.activityCollection.on('session-available', function(sessionID){
                _this.displaySession(sessionID);
            });
        },
        selectSession: function(e){
            //get session data
            var sessionID = $(e.currentTarget).data('id');
            this.getSession(sessionID);
        },
        closeSession: function(){
            this.$el.find('#activity, .activity-overlay').remove();
            this.$el.removeClass('content-overlay');
        },
        getSession: function(sessionID){
            var _this = this;

            if(this.activityCollection.where({id: sessionID}).length === 0){
                this.activityCollection.fetch({
                    url: 'api/v1/session/' + sessionID,
                    success: function(){
                        _this.activityCollection.trigger('session-available', sessionID);
                    }
                });
            } else {
                //self.displaySession(sessionID);
                this.activityCollection.trigger('session-available', sessionID);
            }
        },
        displaySession: function(sessionID){
            var compiledTemplate = _.template(SessionTemplate, this.activityCollection.get({id: sessionID}).toJSON());
            this.$el.addClass('content-overlay');
            this.$el.find('.section').append(compiledTemplate);
        }
    });

    return ActivityView;
});