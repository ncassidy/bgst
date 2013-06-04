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
        dom: {
            $nav: null,
            $sections: null,
            $landing: null
        },
        events: {
            'click #login-submit': 'getLoginCreds'
        },
        state: {
            hasRendered: false,
            height: null
        },
        viewHelpers: {
            textTruncate: function(text, limit){
                return text.substr(0, limit).substr(0, Math.min(text.length, text.lastIndexOf(" "))) + '...';
            }
        },
        initialize: function(){
            this.dom.$nav = this.$el.find('#nav-options');
            this.dom.$sections = this.$el.find('#sections');
            this.dom.$landing = this.$el.find('#landing');

            this.state.height = this.dom.$landing.css('height');
        },
        render: function(){
            this.displayNav();
            this.displayActivity();
            this.displayChart();
        },
        displayNav: function(){
            this.dom.$nav.find('li').removeClass('active');
        },
        displayActivity: function(){
            var _this = this;

            if(!this.state.hasRendered){
                this.dom.$landing.find('.activity-items').find('li').each(function(index){
                    $(this).delay(index * 250).animate({opacity: 1}, 250);
                });
            }

            this.dom.$landing.show().animate({height: this.state.height}, 300, function(){
                _this.dom.$sections.animate({height: _this.state.height}, 300);
                _this.dom.$sections.find('> li').not('#landing').css('height', '0').hide();

                if(!_this.state.hasRendered){
                    _this.dom.$landing.find('.activity-items').find('li').each(function(index){
                        $(this).delay(index * 250).animate({opacity: 1}, 250);
                    });

                    _this.state.hasRendered = true;
                }
            });
        },
        displayChart: function(){
            this.state.chart = new Highcharts.Chart({
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
                url: 'api/v1/account/login',
                type: 'POST',
                data:{
                    email: username,
                    password: password
                },
                success: function(){
                    _this.displayLoggedIn();
                },
                error: function(){
                    _this.displayError(arguments[1].responseText.replace(/"/g,''));
                }
            });
        },
        displayLoggedIn: function(){
            var data = this.userModel.toJSON(),
                compiledTemplate = _.template(LoginTemplate, {user: data});
            this.$el.find('#profile').find('div').empty().append(compiledTemplate);

            var compiledTemplate = _.template(NavTemplate);
            this.dom.$nav.append(compiledTemplate);
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

    return LandingView;
});