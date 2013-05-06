define([
    'jquery',
    'underscore',
    'backbone',
    'highcharts',
    'app/models/user',
    'text!/../templates/nav-template.html',
    'text!/../templates/login-template.html',
    'text!/../templates/error-modal-template.html'
], function($, _, Backbone, Highcharts, UserModel, NavTemplate, LoginTemplate, ErrorTemplate){
    var LandingView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click #login-submit': 'getLoginCreds'
        },
        viewHelpers: {
            textTruncate: function(text, limit){
                return text.substr(0, limit).substr(0, Math.min(text.length, text.lastIndexOf(" "))) + '...';
            }
        },
        initialize: function(){
            this.landingViewCapture = this.$el.find('.section').html();
        },
        render: function(){
            this.displayLanding();
            this.displayChart();
        },
        displayLanding: function(){
            this.$el.find('.section').empty().append(this.landingViewCapture);
            this.$el.find('#nav-options').find('li').removeClass('active');
        },
        displayChart: function(){
            new Highcharts.Chart({
                chart: {
                    renderTo: 'chart',
                    defaultSeriesType: 'bar'
                },
                title: {
                    text: null
                },
                xAxis: {
                    categories: BGST.MostPlayedGames.games,
                    title: {
                        text: null
                    },
                    labels: {
                        style: {
                            color: '#666',
                            fontFamily: 'Verdana'
                        }
                    },
                    gridLineColor: '#e1e1e1'
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Sessions Played',
                        align: 'high',
                        style: {
                            color: '#666',
                            fontFamily: 'Verdana'
                        }
                    },
                    labels: {
                        style: {
                            color: '#666'
                        }
                    },
                    gridLineColor: '#e1e1e1'
                },
                tooltip: {
                    borderWidth:0,
                    formatter: function() {
                        var unit = this.y > 1 ? ' Sessions' : ' Session';
                        return this.y + unit + ' Played';
                    },
                    borderRadius: 0,
                    style: {
                        color: '#666',
                        fontFamily: 'Verdana'
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: false
                        },
                        borderWidth: 0,
                        borderColor: '#e1e1e1',
                        color: '#00a2ff',
                        shadow: true
                    }
                },
                legend: {
                    enabled: false,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -100,
                    y: 100,
                    borderWidth: 1,
                    backgroundColor: '#fff'
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: null,
                    data: BGST.MostPlayedGames.sessions
                }]
            });
        },
        getLoginCreds: function(e){
            e.preventDefault();

            var username = this.$el.find('#login-username').val();
            var password = this.$el.find('#login-password').val();

            this.loginUser(username, password);
        },
        loginUser: function(username, password){
            var _this = this;

            this.userModel = new UserModel();
            this.userModel.fetch({
                type: 'POST',
                data:{
                    email: username,
                    password: password
                },
                success: function(){
                    var data = _this.userModel.toJSON();

                    var compiledTemplate = _.template(LoginTemplate, {user: data});
                    _this.$el.find('#profile').find('div').empty().append(compiledTemplate);

                    var compiledTemplate = _.template(NavTemplate);
                    _this.$el.find('#nav-options').append(compiledTemplate);
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
        }
    });

    return LandingView;
});