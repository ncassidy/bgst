<!DOCTYPE html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"><!--<![endif]-->
    <head>
        <title>BGST - Board Game Session Tracker</title>

        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width">
        <meta charset="utf-8">
        <meta name="description" content="Board Game Session Tracker">

        {{ HTML::style('css/global.css') }}

        <script>
            //JavaScript off fallback
            document.write('<style>#js-off { display: none; }</style>');
        </script>
    </head>
    <body>
        <div id="nav">
            <div>
                <h1>BGST</h1>
                <ul>
                    <li class="sessions"><a href="#" title="Sessions">Sessions</a></li>
                    <li class="tournaments"><a href="#" title="Tournaments">Tournaments</a></li>
                    <li class="achievements"><a href="#" title="Achievements">Achievements</a></li>
                </ul>
                <a id="profile">
                    <div>
                        <form>
                            <p> <label for="login-username">Username: </label><input type="text" id="login-username" name="username" /></p>
                            <p> <label for="login-password">Password: </label><input type="password" id="login-password" name="password" /></p>
                            <p><input type="submit" id="login-submit" value="Log In" /></p>
                        </form>
                    </div>
                </a>
            </div>
            <div id="ribbon-left"></div>
            <div id="ribbon-right"></div>
        </div>
        <div id="content">
            <p id="js-off">You do not have JavaScript enabled. Please enable JavaScript to enjoy BGST as intended!</p>
            <!--[if lt IE 8]>
            <p>You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
            <![endif]-->
            <div class="section">
                <div class="module activity">
                    <h2>Recent Activity</h2>
                    <div>
                        <ul>
                            <li class="session">
                                <div>
                                    <h3><a href="#" title="Session">Session</a></h3>
                                    <p><a href="#" title="Session Title"><span>Session Title</span><br/>Short Session Description</a></p>
                                </div>
                            </li>
                            <li class="tournament">
                                <div>
                                    <h3><a href="#" title="Tournament">Tournament</a></h3>
                                    <p><a href="#" title="Session Title"><span>Tournament Title</span><br/>Short Tournament Description</a></p>
                                </div>
                            </li>
                            <li class="achievement">
                                <div>
                                    <h3><a href="#" title="Achievement">Achievement</a></h3>
                                    <p><a href="#" title="Session Title"><span>Achievements Title</span><br/>Short Achievements Description</a></p>
                                </div>
                            </li>
                            <li class="session">
                                <div>
                                    <h3><a href="#" title="Session">Session</a></h3>
                                    <p><a href="#" title="Session Title"><span>Session Title</span><br/>Short Session Description</a></p>
                                </div>
                            </li>
                            <li class="tournament">
                                <div>
                                    <h3><a href="#" title="Tournament">Tournament</a></h3>
                                    <p><a href="#" title="Session Title"><span>Tournament Title</span><br/>Short Tournament Description</a></p>
                                </div>
                            </li>
                            <li class="session">
                                <div>
                                    <h3><a href="#" title="Session">Session</a></h3>
                                    <p><a href="#" title="Session Title"><span>Session Title</span><br/>Short Session Description</a></p>
                                </div>
                            </li>
                            <li class="session">
                                <div>
                                    <h3><a href="#" title="Session">Session</a></h3>
                                    <p><a href="#" title="Session Title"><span>Session Title</span><br/>Short Session Description</a></p>
                                </div>
                            </li>
                            <li class="session">
                                <div>
                                    <h3><a href="#" title="Session">Session</a></h3>
                                    <p><a href="#" title="Session Title"><span>Session Title</span><br/>Short Session Description</a></p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="module chart">
                    <h2>Most Played Games</h2>
                    <div id="chart"></div>
                </div>
            </div>
            <div id="footer">
                <ul>
                    <li><a href="#" title="About">About</a></li>
                    <li><a href="#" title="Contact">Contact</a></li>
                </ul>
                <p>Copyright © 2013 BGST LLC. All rights reserved.</p>
            </div>
        </div>

        <script data-main="js/app" src="js/lib/require-2.1.5.min.js"></script>
        <script>
            // Chart Data
            var games = ['Dominion', 'Android: Netrunner','Eclipse', 'El Grande', 'Race for the Galaxy', 'The Resistence', 'Hive', 'Caylus', 'Stone Age', 'Troyes'],
                plays = [14, 9, 8, 6, 5, 3, 3, 2, 1, 1];
        </script>
    </body>
</html>
