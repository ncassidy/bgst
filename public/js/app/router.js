define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/sessions',
    'app/views/session',
    'app/views/about',
    'app/views/contact'
], function($, _, Backbone, SessionsView, SessionView, AboutView, ContactView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'showLanding',
            'sessions': 'showSessions',
            'sessions/:sessionID': 'showSession',
            'achievements': 'showAchievements',
            'achievements/:achievementID': 'showAchievement',
            'about': 'showAbout',
            'contact': 'showContact'
        },
        showLanding: function(){

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

        },
        showAbout: function(){
            var aboutView = new AboutView();
        },
        showContact: function(){
            var contactView = new ContactView();
        }
    });

    Router = new AppRouter;
    Backbone.history.start();
});
