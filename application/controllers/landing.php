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

        return View::make('landing.index', array('sessions' => $sessions, 'games' => $games));
	}

}