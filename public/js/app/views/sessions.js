define([
    'jquery',
    'underscore',
    'backbone',
    'app/collections/session',
    'text!/../templates/session-template.html',
    'text!/../templates/error-modal-template.html'
], function($, _, Backbone, SessionCollection, SessionsTemplate, ErrorTemplate){
    var SessionsView = Backbone.View.extend({
        el: $('body'),
        viewHelpers: {
            textTruncate: function(text, limit){
                return text.substr(0, limit).substr(0, Math.min(text.length, text.lastIndexOf(" "))) + '...';
            }
        },
        initialize: function(){
            this.sessionsCollection = new SessionCollection();
        },
        render: function(){
            var _this = this;

            this.getSessions();
            this.sessionsCollection.on('sessions-loaded', function(){
                _this.displayView();
            });
        },
        getSessions: function(){
            var _this = this;

            if(this.sessionsCollection.length === 0){
                this.sessionsCollection.fetch({
                    success: function(){
                        _this.sessionsCollection.trigger('sessions-loaded');
                    },
                    error: function(){
                        _this.displayError(arguments[1].responseText.replace(/"/g,''));
                    }
                });
            } else {
                this.sessionsCollection.trigger('sessions-loaded');
            }
        },
        displayView : function(){
            var data = this.sessionsCollection.toJSON();
            _.extend(data, this.viewHelpers);

            this.$el.find('#activity-title').text('Your Sessions');
            this.$el.find('.stats').remove();

            var compiledTemplate = _.template(SessionsTemplate, {sessions: data});
            this.$el.find('.activity-items').empty().append(compiledTemplate);
        },
        displayError: function(errorMessage){
            var compiledTemplate = _.template(ErrorTemplate, {error: errorMessage});
            this.$el.append(compiledTemplate);

            this.$el.find('.error-ok, .error-close').on('click', function(){
                window.location = '/';
            });
        }
    });

    return SessionsView;
});