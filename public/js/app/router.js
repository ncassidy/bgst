define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/landing',
    'app/views/sessions',
    'app/views/session-add',
    'app/views/session',
    'app/views/about',
    'app/views/contact',
    'app/views/profile'
], function($, _, Backbone, LandingView, SessionsView, SessionAddView, SessionView, AboutView, ContactView, ProfileView){
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
            this.sessionView = new SessionView();
        },
        showLanding: function(){
            this.landingView.render();
        },
        showSessions: function(){
            this.sessionsView.render();
        },
        addSession: function(){
            this.sessionAddView = new SessionAddView();
        },
        showSession: function(sessionID){
            this.sessionView.render(sessionID);
        },
        showAchievements: function(){

        },
        showAchievement: function(achievementID){

        },
        showAbout: function(){
            this.aboutView = new AboutView();
        },
        showContact: function(){
            this.contactView = new ContactView();
        },
        showProfile: function(){
            this.profileView = new ProfileView();
        },
        logout: function(){
            $.ajax({
                url: 'api/v1/account/logout',
                type: 'POST'
            }).done(function(){
                window.location = '/';
            });
        }
    });

    Router = new AppRouter;
    Backbone.history.start();
});
