define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/landing',
    'app/views/sessions',
    'app/views/session',
    'app/views/about',
    'app/views/contact'
], function($, _, Backbone, LandingView, SessionsView, SessionView, AboutView, ContactView){
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
        initialize: function(){
            this.landingView = new LandingView();
            this.sessionsView = new SessionsView();
            this.sessionView = new SessionView();
            this.aboutView = new AboutView();
            this.contactView = new ContactView();
        },
        showLanding: function(){
            this.landingView.render();
        },
        showSessions: function(){
            this.sessionsView.render();
        },
        showSession: function(sessionID){
            this.sessionView.render(sessionID);
        },
        showAchievements: function(){

        },
        showAchievement: function(achievementID){

        },
        showAbout: function(){
            this.aboutView.render();
        },
        showContact: function(){
            this.contactView.render();
        }
    });

    Router = new AppRouter;
    Backbone.history.start();
});
