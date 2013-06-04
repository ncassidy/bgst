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
            'click #profile-submit': 'getProfileUpdates',
            'change #profile-country': 'selectCountry',
            'change #profile-state': 'selectState',
            'click .modal-overlay' : 'closeProfile',
            'click .close' : 'closeProfile'
        },
        viewHelpers: {
            validateName: function(name){
                var namePattern = /^([a-zA-Zb]){1,25}$/;
                return namePattern.test(name);
            },
            validateEmail: function(email){
                var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                return emailPattern.test(email);
            },
            validateLocation: function(location){
                var locationPattern = /^([a-zA-Zb]){2,2}$/;
                return locationPattern.test(location);
            }
        },
        initialize: function(){
            this.render();
        },
        render: function(){
            this.getProfile();
        },
        getProfile: function(){
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

            //set profile selects
            $compiledTemplate.find('#profile-country').find('option[value="' + data.country + '"]').attr('selected', 'selected');
            $compiledTemplate.find('#profile-state').find('option[value="' + data.state + '"]').attr('selected', 'selected');
            if(data.country !== 'US'){ $compiledTemplate.find('#profile-state').attr('disabled', 'disabled'); }

            this.$el.append($compiledTemplate);
            this.$el.find('#modal-profile').animate({opacity: 1}, 150);
        },
        selectCountry: function(){
            var $country = this.$el.find('#profile-country');
            $country.find('option[selected="selected"]').removeAttr('selected');
            $country.find('option:selected').attr('selected', 'selected');

            if($country.val() !== 'US'){
                this.$el.find('#profile-state').attr('disabled', 'disabled');
                this.$el.find('#profile-state').find('option[value="IT"]').attr('selected', 'selected');
            } else {
                this.$el.find('#profile-state').removeAttr('disabled');
            }
        },
        selectState: function(){
            var $state = this.$el.find('#profile-state');
            $state.find('option[selected="selected"]').removeAttr('selected');
            $state.find('option:selected').attr('selected', 'selected')
        },
        getProfileUpdates: function(){
            var firstName = this.$el.find('#profile-firstname').val(),
                lastName = this.$el.find('#profile-lastname').val(),
                email = this.$el.find('#profile-email').val(),
                country = this.$el.find('#profile-country').find('option[selected="selected"]').val(),
                state = this.$el.find('#profile-state').find('option[selected="selected"]').val();

            //validate profile updates
            if(this.viewHelpers.validateName(firstName) && this.viewHelpers.validateName(lastName) && this.viewHelpers.validateEmail(email) && this.viewHelpers.validateLocation(country) && this.viewHelpers.validateLocation(state)){
                this.updateProfile(firstName, lastName, email, country, state);
            } else {
                var error = '';

                if(!this.viewHelpers.validateName(firstName) || !this.viewHelpers.validateName(lastName)){
                    error = error + 'The supplied first or last name either didn\'t meet the length requirements or included invalid characters.<br/><br/>'
                }

                if(!this.viewHelpers.validateEmail(email)){
                    error = error + 'The supplied email address is not valid.<br/><br/>'
                }

                if(!this.viewHelpers.validateLocation(country) || !this.viewHelpers.validateLocation(state)){
                    error = error + 'You did not select a country or state.'
                }

                this.displayError(error);
            }
        },
        updateProfile: function(firstName, lastName, email, country, state){
            var _this = this;

            this.userModel = new UserModel();
            this.userModel.fetch({
                url: 'api/v1/account/update',
                type: 'POST',
                data:{
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    country: country,
                    state: state
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