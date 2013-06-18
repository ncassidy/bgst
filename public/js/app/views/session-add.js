define([
    'jquery',
    'jqueryui',
    'underscore',
    'backbone',
    'tiny',
    'app/models/user',
    'text!/../templates/session-add-modal-template.html',
    'text!/../templates/error-modal-template.html'
], function($, UI, _, Backbone, Tiny, UserModel, SessionAddTemplate, ErrorTemplate){
    var SessionView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click .add-player': 'addPlayer',
            'click .remove-player': 'removePlayer',
            'click #session-submit': 'getSessionDetails',
            'click .modal-overlay' : 'closeAddSession',
            'click .close' : 'closeAddSession'
        },
        state: {
            date: null,
            summary: null
        },
        viewHelpers: {
            validateTitle: function(name){
                var titlePattern = /^([a-zA-Zb]){1,25}$/;
                return titlePattern.test(name);
            },
            validateDate: function(name){
                var datePattern = /^([a-zA-Zb]){1,25}$/;
                return datePattern.test(name);
            },
            validateGame: function(name){
                var gamePattern = /^[0-9]{1,}$/;
                return gamePattern.test(name);
            }
        },
        initialize: function(){
            this.render();
        },
        render: function(){
            this.getAddSessionModalDetails();
        },
        getAddSessionModalDetails: function(){
            var _this = this;

            this.userModel = new UserModel();
            this.userModel.fetch({
                url: 'api/v1/account',
                type: 'GET',
                success: function(){
                    _this.displayAddSessionModal();
                },
                error: function(){
                    _this.displayError(arguments[1].responseText.replace(/"/g,''));
                }
            });
        },
        displayAddSessionModal: function(){
            var data = this.userModel.toJSON(),
                compiledTemplate = _.template(SessionAddTemplate, {user: data});
            this.$el.append(compiledTemplate);
            this.$el.find('.modal-overlay').animate({opacity: .5}, 150);
            this.$el.find('#modal-session').animate({opacity: 1}, 150);

            this.displaySessionEditors();
        },
        displaySessionEditors: function(){
            $('#session-date').datepicker();

            this.state.summary = tinymce.init({
                selector: "#session-summary",
                width: 312,
                menubar: false,
                statusbar: false,
                toolbar: false,
                forced_root_block: false,
                browser_spellcheck: true
            });
        },
        getSessionDetails: function(){
            var title = this.$el.find('#session-title').val(),
                date = this.$el.find('#session-date').val(),
                game = this.$el.find('#session-game').val(),
                summary = this.$el.find('#session-summary').val(),
                $players = this.$el.find('.player');

            //validate session details
            if(this.viewHelpers.validateName(title) && this.viewHelpers.validateDate(date) && this.viewHelpers.validateGame(game)){
                this.addSession(title, date, game, summary, $players);
            } else {
                var error = '';

                if(!this.viewHelpers.validateTitle(title)){
                    error = error + 'The supplied first or last name either didn\'t meet the length requirements or included invalid characters.<br/><br/>'
                }

                this.displayError(error);
            }
        },
        removePlayer: function(e){
            $(e.currentTarget).closest('tr').remove();
        },
        addPlayer: function(e){
            $(e.currentTarget).closest('tr').clone().removeAttr('id').insertBefore('#player-template').find('.player-edit').empty().append('<a class="remove-player" title="Remove">-</a>');
            this.$el.find('#player-template').not().find('input, select').each(function(){
                $(this).val('').removeAttr('checked');
            })
        },
        addSession: function(title, date, game, summary, $players){

        },
        closeAddSession: function(){
            this.undelegateEvents();
            this.$el.find('.modal, .modal-overlay').remove();
            window.history.back();
        },
        displayError: function(errorMessage){
            var compiledTemplate = _.template(ErrorTemplate, {error: errorMessage});
            this.$el.append(compiledTemplate);
            this.$el.find('.modal-overlay').animate({opacity: .5}, 150);
            this.$el.find('#modal-error').animate({opacity: 1}, 150);

            this.$el.find('.error-ok, .error-close').on('click', function(){
                window.location = '/';
            });
        }
    });

    return SessionView;
});