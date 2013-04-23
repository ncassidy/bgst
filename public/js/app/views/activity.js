define([
    'jquery',
    'underscore',
    'backbone',
    'text!/../templates/session-template.html'
], function($, _, Backbone, SessionTemplate){
    var ActivityView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click .session': "showSession",
            'click .activity-overlay': "closeSession"
        },
        showSession: function(e){
            //get session data
            var $sessionID = $(e.currentTarget).data('id');
            var data = this.getSession($sessionID);

            //display template
            var compiledTemplate = _.template(SessionTemplate, data);
            this.$el.addClass('content-overlay');
            this.$el.find('.section').append(compiledTemplate);
        },
        closeSession: function(){
            this.$el.find('#activity, .activity-overlay').remove();
            this.$el.removeClass('content-overlay');
        },
        getSession: function($sessionID){
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: 'api/v1/session/' + $sessionID
            })
            .success(function(data){return data})
            .error(function(data){return data});
        }
    });

    return ActivityView;
});