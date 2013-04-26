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
                <h1><a href="#" title="Board Game Session Tracker">BGST</a></h1>
                <ul id="nav-options"></ul>
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
                    <h2 id="activity-title">Recent Activity</h2>
                    <div>
                        <ul class="activity-items">
                            @foreach ($sessions as $session)
                            <li class="session" data-id="{{ $session->id }}">
                                <div>
                                    <h3><a href="#sessions/{{ $session->id }}" title="Session">Session</a></h3>
                                    <p><a href="#sessions/{{ $session->id }}" title="{{ $session->title }}"><span>{{ $session->title }}</span><br/>{{ Str::limit($session->summary, 55) }}</a></p>
                                </div>
                            </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
                <div class="module chart">
                    <h2>Most Played Games</h2>
                    <div id="chart"></div>
                </div>
                <div class="module stats">
                    <h2>BGST Stats</h2>
                    <ul>
                        <li>Users Registered: <span>{{ $stats['user_count'] }}</span></li>
                        <li>Games Tracked: <span>{{ $stats['game_count'] }}</span></li>
                        <li>Sessions Logged: <span>{{ $stats['session_count'] }}</span></li>
                    </ul>
                </div>
            </div>
            <div id="footer">
                <ul>
                    <li><a id="about" href="/#about" title="About">About</a></li>
                    <li><a id="contact" href="/#contact" title="Contact">Contact</a></li>
                </ul>
                <p>Copyright © 2013 BGST LLC. All rights reserved.</p>
            </div>
        </div>

        <script data-main="js/main" src="js/lib/require-2.1.5.min.js"></script>
        <script>
            var games = [<?php foreach($games as $game):?>'<?php echo $game->title ?>',<?php endforeach; ?>],
                plays = [<?php foreach($games as $game):?><?php echo $game->session_count ?>,<?php endforeach; ?>];
        </script>
    </body>
</html>
