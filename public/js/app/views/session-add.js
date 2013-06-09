define([
    'jquery',
    'underscore',
    'backbone',
    'app/collections/session',
    'text!/../templates/session-add-modal-template.html',
    'text!/../templates/error-modal-template.html'
], function($, _, Backbone, SessionCollection, SessionAddTemplate, ErrorTemplate){
    var SessionView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click .modal-overlay' : 'closeSessionAdd',
            'click .close' : 'closeSessionAdd'
        },
        initialize: function(){
            this.render();
        },
        render: function(){
            this.displaySessionAdd();
        },
        displaySessionAdd: function(){
            var compiledTemplate = _.template(SessionAddTemplate);
            this.$el.append(compiledTemplate);
            this.$el.find('.modal-overlay').animate({opacity: .5}, 150);
            this.$el.find('#modal-session').animate({opacity: 1}, 150);
        },
        closeSessionAdd: function(){
            this.undelegateEvents();
            this.$el.find('.modal, .modal-overlay').remove();
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