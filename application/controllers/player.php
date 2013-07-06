<?php

class Player_Controller extends Base_Controller {

    public $restful = true;

    public function get_players()
    {
        if(!Session::has('user_id')){
            return Response::Json('You are not logged in.', 403);
        }

        $player = new Player();
        $results = $player->getPlayersByUserId(Session::get('user_id'));

        return Response::Json($results, 200);
    }

}