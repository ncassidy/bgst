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
            document.write('<style>#js-off { display: none; }</style>');
        </script>
    </head>
    <body>
        <div id="nav">
            <div>
                <h1><a href="#" title="Board Game Session Tracker">BGST</a></h1>
                <ul id="nav-options">
                    @if ($loginStatus)
                    <li class="sessions"><a href="/#sessions" title="Sessions">Sessions</a></li>
                    @endif
                </ul>
                <div id="profile">
                    <div>
                        @if ($loginStatus)
                        <h3>{{ $user->first_name }} {{ $user->last_name }}</h3>
                        <p><a href="/#profile" title="Edit Profile">Edit Profile</a></p>
                        <p><a href="/#logout" title="Log Out">Log Out</a></p>
                        @else
                        <form>
                            <p><label for="login-username">Username: </label><input type="text" id="login-username" name="username" /></p>
                            <p><label for="login-password">Password: </label><input type="password" id="login-password" name="password" /></p>
                            <p><input type="submit" id="login-submit" value="Log In" /></p>
                        </form>
                        @endif
                    </div>
                </div>
            </div>
            <div id="ribbon-left"></div>
            <div id="ribbon-right"></div>
        </div>
        <div id="content">
            <p id="js-off">You do not have JavaScript enabled. Please enable JavaScript to enjoy the BGST as intended!</p>
            <!--[if lt IE 8]>
            <p>You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
            <![endif]-->
            <div id="section" class="landing">
                <div class="module activity landing-view">
                    <h2 id="activity-title">Recent Activity</h2>
                    <div>
                        <ul class="activity-items">
                            @foreach ($sessions as $session)
                            <li class="session">
                                <div>
                                    <h3><a href="#sessions/{{ $session->id }}" title="{{ $session->title }}">Session</a></h3>
                                    <a href="#sessions/{{ $session->id }}" title="{{ $session->title }}"></a>
                                    <p><a href="#sessions/{{ $session->id }}" title="{{ $session->title }}"><span class="title">{{ $session->title }}</span><br/><span class="date">{{ date('F j, Y', strtotime($session->date)) }}</span><br/>{{ Str::limit($session->summary, 40) }}</a></p>
                                </div>
                            </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
                <div class="module chart landing-view">
                    <h2>Most Played Games</h2>
                    <div id="chart"></div>
                </div>
                <div class="module stats landing-view">
                    <h2>BGST Stats</h2>
                    <ul>
                        <li>Users Registered: <span>{{ $stats['user_count'] }}</span></li>
                        <li>Sessions Logged: <span>{{ $stats['session_count'] }}</span></li>
                        <li>Games Tracked: <span>{{ $stats['game_count'] }}</span></li>
                    </ul>
                </div>
            </div>
            <div id="footer">
                <ul>
                    <li><a id="about" href="/#about" title="About">About</a></li>
                    <li><a id="contact" href="/#contact" title="Contact">Contact</a></li>
                </ul>
                <p>Copyright © {{ date('Y', time()) }} BGST LLC. All rights reserved.</p>
            </div>
        </div>

        <script data-main="js/main" src="js/lib/require-2.1.5.min.js"></script>
        <script>
            var BGST = BGST || {};

            BGST.MostPlayedGames = {
                games: [<?php foreach($games as $game):?>'<?php echo $game->title ?>',<?php endforeach; ?>],
                sessions: [<?php foreach($games as $game):?><?php echo $game->session_count ?>,<?php endforeach; ?>]
            };
        </script>
    </body>
</html>
