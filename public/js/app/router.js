define([
    'backbone',
    'app/views/landing'
], function(Backbone){
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'showLanding',
            'sessions': 'showSessions',
            'achievements': 'showAchievements',
            'about': 'showAbout',
            'contact': 'showContact'
        },
        showLanding: function(){
            //stubbed
        },
        showSessions: function(){
            //stubbed
        },
        showAchievements: function(){
            //stubbed
        },
        showAbout: function(){
            //stubbed
        },
        contact: function(){
            //stubbed
        }
    });

    var app_router = new AppRouter;
    Backbone.history.start();
});
