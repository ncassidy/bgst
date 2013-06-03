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
        dom: {
            $nav: null,
            $sections: null,
            $sessions: null
        },
        state: {
            hasRendered: false,
            chart: null
        },
        templates: {
            nav: null
        },
        viewHelpers: {
            textTruncate: function(text, limit){
                return text.substr(0, limit).substr(0, Math.min(text.length, text.lastIndexOf(" "))) + '...';
            }
        },
        initialize: function(){
            this.dom.$nav = this.$el.find('#nav-options');
            this.dom.$sections = this.$el.find('#sections');
            this.dom.$sessions = this.$el.find('#sessions');

            this.sessionsCollection = new SessionCollection();
        },
        render: function(){
            this.displayNav();
            this.getSessions();
        },
        displayNav: function(){
            var compiledTemplate = this.templates.nav || _.template(NavTemplate);
            this.dom.$nav.empty().append(compiledTemplate).find('.sessions').addClass('active');
        },
        getSessions: function(){
            if(this.sessionsCollection.length === 0){
                var _this = this;
                this.dom.$sessions.append('<div class="loading"></div>');

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
            if(!this.state.hasRendered){
                var data = this.sessionsCollection.toJSON();
                _.extend(data, this.viewHelpers);
                var compiledTemplate = _.template(SessionsTemplate, {sessions: data});

                this.dom.$sessions.empty().append(compiledTemplate);
                this.dom.$sessions.find('.activity-items').find('li').each(function(index){
                    $(this).delay(index * 250).animate({opacity: 1}, 250);
                });

                this.state.hasRendered = true;
            }

            this.dom.$sections.find('> li').hide();
            this.dom.$sessions.show();
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