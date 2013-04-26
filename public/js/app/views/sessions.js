define([
    'jquery',
    'underscore',
    'backbone',
    'app/collections/session',
    'text!/../templates/sessions-item-template.html',
    'text!/../templates/session-template.html'
], function($, _, Backbone, SessionCollection, SessionsTemplate, SessionTemplate){
    var SessionsView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click .session': 'selectSession',
            'click .close': 'closeSession',
            'click .activity-overlay': 'closeSession'
        },
        sessionsCollection: undefined,
        sessionCollection: undefined,
        viewHelpers: {
            textTruncate: function(text, limit){
                return text.substr(0, limit).substr(0, Math.min(text.length, text.lastIndexOf(" "))) + '...';
            }
        },
        initialize: function(){
            var _this = this;
            this.sessionsCollection = new SessionCollection();
            this.sessionCollection = new SessionCollection();

            this.getSessions();

            this.sessionsCollection.on('sessions-loaded', function(){
                _this.render();
            });
        },
        render: function(){
            var data = this.sessionsCollection.toJSON();
            _.extend(data, this.viewHelpers);

            this.$el.find('#activity-title').text('Sessions');
            var compiledTemplate = _.template(SessionsTemplate, {sessions: data});
            this.$el.find('.activity-items').empty().append(compiledTemplate);
        },
        getSessions: function(){
            var _this = this;

            if(this.sessionsCollection.where().length === 0){
                this.sessionsCollection.fetch({
                    success: function(){
                        _this.sessionsCollection.trigger('sessions-loaded');
                    }
                });
            } else {
                this.sessionsCollection.trigger('sessions-loaded');
            }
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
            Router.navigate('sessions', {trigger: false});
        }
    });

    return SessionsView;
});