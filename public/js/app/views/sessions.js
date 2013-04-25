define([
    'jquery',
    'underscore',
    'backbone',
    'app/collections/session',
    'text!/../templates/sessions-item-template.html'
], function($, _, Backbone, SessionCollection, SessionsTemplate){
    var SessionsView = Backbone.View.extend({
        el: $('body'),
        sessionCollection: undefined,
        viewHelpers: {
            textTruncate: function(text, limit){
                return text.substr(0, limit).substr(0, Math.min(text.length, text.lastIndexOf(" "))) + '...';
            }
        },
        initialize: function(){
            var _this = this;

            this.sessionCollection = new SessionCollection();
            this.getSessions();
            this.sessionCollection.on('sessions-loaded', function(){
                _this.render();
            });
        },
        render: function(){
            var data = this.sessionCollection.toJSON();
            _.extend(data, this.viewHelpers);

            this.$el.find('#activity-title').text('Sessions');
            var compiledTemplate = _.template(SessionsTemplate, {sessions: data});
            this.$el.find('.activity-items').empty().append(compiledTemplate);
        },
        getSessions: function(){
            var _this = this;

            if(this.sessionCollection.where().length === 0){
                this.sessionCollection.fetch({
                    success: function(){
                        _this.sessionCollection.trigger('sessions-loaded');
                    }
                });
            } else {
                this.sessionCollection.trigger('sessions-loaded');
            }
        }
    });

    return SessionsView;
});