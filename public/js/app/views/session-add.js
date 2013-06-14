define([
    'jquery',
    'underscore',
    'backbone',
    'app/models/user',
    'text!/../templates/session-add-modal-template.html',
    'text!/../templates/error-modal-template.html'
], function($, _, Backbone, UserModel, SessionAddTemplate, ErrorTemplate){
    var SessionView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click .modal-overlay' : 'closeAddSession',
            'click .close' : 'closeAddSession'
        },
        initialize: function(){
            this.render();
        },
        render: function(){
            this.getAddSessionDetails();
        },
        getAddSessionDetails: function(){
            var _this = this;

            this.userModel = new UserModel();
            this.userModel.fetch({
                url: 'api/v1/account',
                type: 'GET',
                success: function(){
                    _this.displayAddSession();
                },
                error: function(){
                    _this.displayError(arguments[1].responseText.replace(/"/g,''));
                }
            });
        },
        displayAddSession: function(){
            var compiledTemplate = _.template(SessionAddTemplate);
            this.$el.append(compiledTemplate);
            this.$el.find('.modal-overlay').animate({opacity: .5}, 150);
            this.$el.find('#modal-session').animate({opacity: 1}, 150);
        },
        closeAddSession: function(){
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