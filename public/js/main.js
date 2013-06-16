require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-1.9.1.min',
        jqueryui: 'lib/jquery-ui-1.10.3.min',
        underscore: 'lib/underscore-1.4.4.min',
        backbone: 'lib/backbone-1.0.0.min',
        text: 'lib/text-2.0.6.min',
        highcharts: 'lib/highcharts-3.0.0.min',
        tiny: 'lib/tinymce/tinymce-4.0.0.min'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'jqueryui': {
            deps: ['jquery']
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
        },
        'tiny': {
            deps: ['jquery'],
            exports: 'Tiny',
            init: function () {
                this.tinyMCE.baseURL = 'js/lib/tinymce';
                this.tinyMCE.DOM.events.domLoaded = true;
                return this.tinyMCE;
            }
        }
    }
});

require(['app/router']);

