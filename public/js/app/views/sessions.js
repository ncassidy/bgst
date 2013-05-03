define([
    'jquery',
    'underscore',
    'backbone',
    'app/collections/session',
    'text!/../templates/nav-template.html',
    'text!/../templates/sessions-template.html',
    'text!/../templates/error-modal-template.html'
], function($, _, Backbone, SessionCollection, NavTemplate, SessionsTemplate, ErrorTemplate){
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

            this.displayNav();
            this.getSessions();

            this.sessionsCollection.on('sessions-loaded', function(){
                _this.displaySessions();
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
        displayNav: function(){
            var compiledTemplate = _.template(NavTemplate);
            this.$el.find('#nav-options').empty().append(compiledTemplate);
        },
        displaySessions : function(){
            var data = this.sessionsCollection.toJSON();
            _.extend(data, this.viewHelpers);

            var compiledTemplate = _.template(SessionsTemplate, {sessions: data});
            this.$el.find('.section').empty().append(compiledTemplate);
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