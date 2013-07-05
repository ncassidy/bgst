<?php

class Game_Controller extends Base_Controller {

    public $restful = true;

    public function get_games($title)
    {
        if(!Session::has('user_id')){
            return Response::Json('You are not logged in.', 403);
        }

        $game = new Game();
        $results = $game->getGameListByTitle($title, 5);

        return Response::Json($results, 200);
    }

}