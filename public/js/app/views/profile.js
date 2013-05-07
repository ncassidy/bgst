define([
    'jquery',
    'underscore',
    'backbone',
    'app/models/user',
    'text!/../templates/profile-modal-template.html',
    'text!/../templates/error-modal-template.html'
], function($, _, Backbone, UserModel, ProfileTemplate, ErrorTemplate){
    var ProfileView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click #profile-submit': 'getProfileDetails',
            'click .modal-overlay' : 'closeProfile',
            'click .close' : 'closeProfile'
        },
        initialize: function(){
            this.render();
        },
        render: function(){
            this.displayProfile();
        },
        getProfileDetails: function(){

        },
        displayProfile: function(){
            var compiledTemplate = _.template(ProfileTemplate);
            this.$el.append(compiledTemplate);
        },
        displayError: function(errorMessage){
            var compiledTemplate = _.template(ErrorTemplate, {error: errorMessage});
            this.$el.append(compiledTemplate);

            this.$el.find('.error-ok, .error-close').on('click', function(){
                window.location = '/';
            });
        },
        closeProfile: function(){
            this.$el.find('.modal, .modal-overlay').remove();
            window.history.back();
        }
    });

    return ProfileView;
});