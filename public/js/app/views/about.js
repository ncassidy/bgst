define([
    'jquery',
    'underscore',
    'backbone',
    'text!/../templates/about-modal-template.html'
], function($, _, Backbone, AboutTemplate){
    var AboutView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click .modal-overlay' : "modalClose",
            'click .close' : "modalClose"
        },
        initialize: function(){
            this.render();
        },
        render: function(){
            var compiledTemplate = _.template(AboutTemplate);
            this.$el.append(compiledTemplate);
        },
        modalClose: function(){
            this.$el.find('.modal, .modal-overlay').remove();
            this.unbind();
            window.history.back();
        }
    });

    return AboutView;
});