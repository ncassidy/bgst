define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/activity',
    'app/views/about',
    'app/views/contact'
], function($, _, Backbone, ActivityView, AboutView, ContactView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'showLanding',
            'sessions': 'showSessions',
            'achievements': 'showAchievements',
            'about': 'showAbout',
            'contact': 'showContact'
        },
        showLanding: function(){
            var sessionView = new ActivityView();
            var aboutView = new AboutView();
            var contactView = new ContactView();
        },
        showSessions: function(){
            //stubbed
        },
        showAchievements: function(){
            //stubbed
        },
        showAbout: function(){
        },
        contact: function(){
            //stubbed
        }
    });

    var app_router = new AppRouter;
    Backbone.history.start();
});
