<?php

class Session_Controller extends Base_Controller {

    public $restful = true;

    public function get_sessions()
    {
        if(!Session::has('user_id')){
            return Response::Json(array('error' => 'You are not logged in.'), 200);
        }

        $session = new PlaySession();
        $result = $session->getSessionsByUserId(Session::get('user_id'));

        return Response::Json($result, 200);
    }

    public function get_session($session_id)
    {
        if(!Session::has('user_id')){
            return Response::Json(array('error' => 'You are not logged in.'), 200);
        }

        $session = new PlaySession();
        $users = new User();
        $players = new Player();

        $sessionResult = (array)$session->getSessionById($session_id);

        if(count($sessionResult) < 1){
            return Response::Json(array('error' => 'That requested session does not exist.'), 200);
        }

        $sessionResult['date'] = date('F j, Y', strtotime($sessionResult['date']));
        $sessionResult['users'] = $users->getUsersBySessionId($session_id);
        $sessionResult['players'] = $players->getPlayersBySessionId($session_id);

        return Response::Json($sessionResult, 200);
    }

    public function post_create()
    {
        if(!Session::has('user_id')){
            return Response::Json(array('session_created' => false, 'error' => 'You are not logged in.'), 200);
        }

        if(Input::has('game_id') && Input::has('title') && Input::has('date') && Input::has('summary')){
            $session = new PlaySession();
            $result = $session->createSession(Session::get('user_id'), Input::get('game_id'), Input::get('title'), Input::get('date'), Input::get('summary'));

            return Response::Json(array('session_created' => true, 'session_id' => $result), 200);
        } else {
            return Response::Json(array('session_created' => false, 'error' => 'Some of the required session details were not provided.'), 200);
        }
    }

}