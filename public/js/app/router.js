define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/landing',
    'app/views/sessions',
    'app/views/session-add',
    'app/views/session',
    'app/views/about',
    'app/views/contact'
], function($, _, Backbone, LandingView, SessionsView, SessionAddView, SessionView, AboutView, ContactView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'showLanding',
            'sessions': 'showSessions',
            'sessions/add': 'addSession',
            'sessions/:sessionID': 'showSession',
            'achievements': 'showAchievements',
            'achievements/:achievementID': 'showAchievement',
            'about': 'showAbout',
            'contact': 'showContact',
            'profile' : 'showProfile',
            'logout' : 'logout'
        },
        initialize: function(){
            this.landingView = new LandingView();
            this.sessionsView = new SessionsView();
            this.sessionAddView = new SessionAddView();
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
        addSession: function(){
            this.sessionAddView.render();
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
        },
        showProfile: function(){

        },
        logout: function(){
        }
    });

    Router = new AppRouter;
    Backbone.history.start();
});
