define([
    'jquery',
    'underscore',
    'backbone',
    'text!/../templates/contact-modal-template.html'
], function($, _, Backbone, ContactTemplate){
    var ContactView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click #contact': "showContact",
            'click .modal-overlay' : "modalClose",
            'click .close' : "modalClose"
        },
        showContact: function(){
            var compiledTemplate = _.template(ContactTemplate);
            this.$el.append(compiledTemplate);
        },
        modalClose: function(){
            this.$el.find('.modal, .modal-overlay').remove();
        }
    });

    return ContactView;
});