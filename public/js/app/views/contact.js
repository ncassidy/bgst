define([
    'jquery',
    'underscore',
    'backbone',
    'text!/../templates/contact-modal-template.html'
], function($, _, Backbone, ContactTemplate){
    var ContactView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click .modal-overlay' : 'closeContact',
            'click .close' : 'closeContact'
        },
        initialize: function(){
            this.render();
        },
        render: function(){
            var compiledTemplate = _.template(ContactTemplate);
            this.$el.append(compiledTemplate);
            this.$el.find('.modal-overlay').animate({opacity: .5}, 150);
            this.$el.find('#modal-contact').animate({opacity: 1}, 150);
        },
        closeContact: function(){
            this.undelegateEvents();
            this.$el.find('.modal, .modal-overlay').remove();
            window.history.back();
        }
    });

    return ContactView;
});