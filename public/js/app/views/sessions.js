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
        state: {
            hasRendered: false,
            chart: null
        },
        initialize: function(){
            this.sessionsCollection = new SessionCollection();
        },
        render: function(){
            this.displayNav();
            this.getSessions();
        },
        displayNav: function(){
            var compiledTemplate = _.template(NavTemplate);
            this.$el.find('#nav-options').empty().append(compiledTemplate).find('.sessions').addClass('active');
        },
        getSessions: function(){
            if(this.sessionsCollection.length === 0){
                var _this = this;
                this.$el.find('#sessions').append('<div class="loading"></div>');

                this.sessionsCollection.fetch({
                    success: function(){
                        _this.displaySessions();
                    },
                    error: function(){
                        _this.displayError(arguments[1].responseText.replace(/"/g,''));
                    }
                });
            } else {
                this.displaySessions();
            }
        },
        displaySessions : function(){
            this.$el.find('#sections').find('> li').hide();
            this.$el.find('#sessions').show();

            if(!this.state.hasRendered){
                var data = this.sessionsCollection.toJSON();
                _.extend(data, this.viewHelpers);
                var compiledTemplate = _.template(SessionsTemplate, {sessions: data});

                this.$el.find('#sessions').empty().append(compiledTemplate);
                this.$el.find('#sessions').find('.activity-items').find('li').each(function(index){
                    $(this).delay(index * 250).animate({opacity: 1}, 250);
                });

                this.state.hasRendered = true;
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

    return SessionsView;
});