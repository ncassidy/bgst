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
            'click #profile-submit': 'updateProfile',
            'click .modal-overlay' : 'closeProfile',
            'click .close' : 'closeProfile'
        },
        initialize: function(){
            this.render();
        },
        render: function(){
            this.getProfileDetails();
        },
        getProfileDetails: function(){
            var _this = this;

            this.userModel = new UserModel();
            this.userModel.fetch({
                url: 'api/v1/account',
                type: 'GET',
                success: function(){
                    _this.displayProfile();
                },
                error: function(){
                    _this.displayError(arguments[1].responseText.replace(/"/g,''));
                }
            });
        },
        displayProfile: function(){
            var data = this.userModel.toJSON(),
                $compiledTemplate = $(_.template(ProfileTemplate, {user: data}));

            //set select data
            $compiledTemplate.find('#profile-country').find('option[value="' + data.country + '"]').attr('selected', 'selected');
            $compiledTemplate.find('#profile-state').find('option[value="' + data.state + '"]').attr('selected', 'selected');
            if(data.country !== 'US'){ $compiledTemplate.find('#profile-state').attr('disabled', 'disabled'); }

            this.$el.append($compiledTemplate);
        },
        updateProfile: function(){
            var _this = this;

            this.userModel = new UserModel();
            this.userModel.fetch({
                url: 'api/v1/account/update',
                type: 'POST',
                data:{
                    first_name: 'Nick',
                    last_name: 'Cassidy',
                    email: 'n@n.com',
                    country: 'US',
                    state: 'CO'
                },
                success: function(){
                    _this.closeProfile();
                },
                error: function(){
                    _this.displayError(arguments[1].responseText.replace(/"/g,''));
                }
            });
        },
        displayError: function(errorMessage){
            var compiledTemplate = _.template(ErrorTemplate, {error: errorMessage});
            this.$el.append(compiledTemplate);

            this.$el.find('.error-ok, .error-close').on('click', function(){
                window.location = '/';
            });
        },
        closeProfile: function(){
            this.undelegateEvents();
            this.$el.find('.modal, .modal-overlay').remove();
            window.history.back();
        }
    });

    return ProfileView;
});