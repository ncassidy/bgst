define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/activity',
    'app/views/sessions',
    'app/views/session',
    'app/views/about',
    'app/views/contact'
], function($, _, Backbone, ActivityView, SessionsView, SessionView, AboutView, ContactView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'showLanding',
            'sessions': 'showSessions',
            'sessions/:sessionID': 'showSession',
            'achievements': 'showAchievements',
            'achievements/:achievementID': 'showAchievement'
        },
        showLanding: function(){
            //var activityView = new ActivityView();
            var aboutView = new AboutView();
            var contactView = new ContactView();
        },
        showSessions: function(){
            var sessionsView = new SessionsView();
        },
        showSession: function(sessionID){
            var sessionView = new SessionView({sessionID: sessionID});
        },
        showAchievements: function(){

        },
        showAchievement: function(achievementID){

        }
    });

    var app_router = new AppRouter;
    Backbone.history.start();
});
