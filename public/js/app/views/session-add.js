define([
    'jquery',
    'underscore',
    'backbone',
    'app/collections/session',
    'text!/../templates/error-modal-template.html'
], function($, _, Backbone, SessionCollection, ErrorTemplate){
    var SessionView = Backbone.View.extend({
        el: $('body'),
        events: {

        },
        initialize: function(){
            this.render();
        },
        render: function(){
        },
        closeSession: function(){
            this.$el.find('#activity, .activity-overlay').remove();
            this.$el.removeClass('content-overlay');
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