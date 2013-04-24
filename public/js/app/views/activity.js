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
            'click .session': "showSession",
            'click .activity-overlay': "closeSession",
            'click .close': "closeSession"
        },
        activityCollection: new SessionCollection(),
        showSession: function(e){
            //get session data
            var $sessionID = $(e.currentTarget).data('id');
            var data = this.getSession($sessionID);
            console.log(data);

            //display template
            var compiledTemplate = _.template(SessionTemplate, data.toJSON());
            this.$el.addClass('content-overlay');
            this.$el.find('.section').append(compiledTemplate);
        },
        closeSession: function(){
            this.$el.find('#activity, .activity-overlay').remove();
            this.$el.removeClass('content-overlay');
        },
        getSession: function($sessionID){
            var cache = this.activityCollection.where({id: $sessionID});

            if(cache.length === 0){
                var sessionModel = new SessionModel({url: 'api/v1/session/' + $sessionID});
                sessionModel.fetch();
                this.activityCollection.add(sessionModel);
            } else {
                var sessionModel = cache[0];
            }

            return sessionModel;
        }
    });

    return ActivityView;
});