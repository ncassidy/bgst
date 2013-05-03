require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-1.9.1.min',
        underscore: 'lib/underscore-1.4.4.min',
        backbone: 'lib/backbone-1.0.0.min',
        text: 'lib/text-2.0.6.min',
        highcharts: 'lib/highcharts-3.0.0.min'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            deps: ['jquery'],
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'highcharts': {
            deps: ['jquery'],
            exports: 'Highcharts'
        }
    }
});

require(['app/router']);

