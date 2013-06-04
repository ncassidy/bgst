define([
    'jquery',
    'underscore',
    'backbone',
    'text!/../templates/about-modal-template.html'
], function($, _, Backbone, AboutTemplate){
    var AboutView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click .modal-overlay' : 'closeAbout',
            'click .close' : 'closeAbout'
        },
        initialize: function(){
            this.render();
        },
        render: function(){
            var compiledTemplate = _.template(AboutTemplate);
            this.$el.append(compiledTemplate);
            this.$el.find('#modal-about').animate({opacity: 1}, 150);
        },
        closeAbout: function(){
            this.undelegateEvents();
            this.$el.find('.modal, .modal-overlay').remove();
            window.history.back();
        }
    });

    return AboutView;
});