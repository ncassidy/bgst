// Require Lib Config
require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-1.9.1.min',
        highcharts: 'lib/highcharts'
    }
});

// App Init Logic
requirejs(['jquery', 'highcharts'], function(){
    // Charts Logic
    $(document).ready(function() {
        new Highcharts.Chart({
            chart: {
                renderTo: 'chart',
                defaultSeriesType: 'bar'
            },
            title: {
                text: null
            },
            xAxis: {
                categories: window.games,
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
                data: window.plays
            }]
        });
    });
});
