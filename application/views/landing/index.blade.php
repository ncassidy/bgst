<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <title>BGST - Board Game Session Tracker</title>

        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width">
        <meta charset="utf-8">
        <meta name="description" content="Vail Resorts web standards documentation.">

        {{ HTML::style('css/global.css') }}

        <script>
            //JavaScript off fallback
            document.write('<style>.js-off { display: none; }</style>');
        </script>
    </head>
    <body>
        <p class="js-off">You do not have JavaScript enabled. Please enable JavaScript to enjoy BGST as intended!</p>
        <!--[if lt IE 7]>
        <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <div id="nav">
            <div>
                <h1>BGST</h1>
                <ul>
                    <li class="active"><a href="#" alt="Sessions">Sessions</a></li>
                    <li><a href="#" alt="Profile">Profile</a></li>
                    <li><a href="#" alt="About">About</a></li>
                    <li><a href="#" alt="Contact">Contact</a></li>
                </ul>
            </div>
            <div id="ribbon-left"></div>
            <div id="ribbon-right"></div>
        </div>

        <div id="content">
            <div class="section">
                <h2>Recent Activity</h2>
            </div>
            <p id="copyright">Copyright © 2013 BGST LLC. All rights reserved.</p>
        </div>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script>
            $(document).ready(function(){

            });
        </script>
    </body>
</html>
