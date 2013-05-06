<?php

class Landing_Controller extends Base_Controller {

	public function action_index()
	{
        //get recent sessions
        $session = new PlaySession();
        $sessions = $session->getRecentSessions(8);

        //get most played games
        $game = new Game();
        $games = $game->getMostPlayedGames(10);

        //get bgst stats
        $user = new User();
        $stats['user_count'] = number_format($user->getUserCount());
        $stats['game_count'] = number_format($game->getGameCount());
        $stats['session_count'] = number_format($session->getSessionCount());

        //get login status
        $loginStatus = Session::has('user_id') ? true : false;

        return View::make('landing.index', array('sessions' => $sessions, 'games' => $games, 'stats' => $stats, 'loginStatus' => $loginStatus));
	}

}