define([
    'jquery',
    'underscore',
    'backbone',
    'text!/../templates/contact-modal-template.html'
], function($, _, Backbone, ContactTemplate){
    var ContactView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click .modal-overlay' : "modalClose",
            'click .close' : "modalClose"
        },
        initialize: function(){
            this.render();
        },
        render: function(){
            var compiledTemplate = _.template(ContactTemplate);
            this.$el.append(compiledTemplate);
        },
        modalClose: function(){
            this.$el.find('.modal, .modal-overlay').remove();
            this.unbind();
            window.history.back();
        }
    });

    return ContactView;
});