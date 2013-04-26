<?php

class Session_Controller extends Base_Controller {

    public $restful = true;

    public function get_sessions()
    {
        if(!Session::has('user_id')){
            return Response::Json('You are not logged in.', 403);
        }

        $session = new PlaySession();
        $results = $session->getSessionsByUserId(Session::get('user_id'));

        return Response::Json($results, 200);
    }

    public function get_session($session_id)
    {
        if(!Session::has('user_id')){
            return Response::Json('You are not logged in.', 403);
        }

        $session = new PlaySession();
        $users = new User();
        $players = new Player();

        $result = (array)$session->getSessionById($session_id);

        if(count($result) < 1){
            return Response::Json('The requested session does not exist.', 404);
        }

        $result['date'] = date('F j, Y', strtotime($result['date']));
        $result['users'] = $users->getUsersBySessionId($session_id);
        $result['players'] = $players->getPlayersBySessionId($session_id);

        return Response::Json($result, 200);
    }

    public function post_create()
    {
        if(!Session::has('user_id')){
            return Response::Json('You are not logged in.', 403);
        }

        if(Input::has('game_id') && Input::has('title') && Input::has('date') && Input::has('summary')){
            $session = new PlaySession();
            $result = $session->createSession(Session::get('user_id'), Input::get('game_id'), Input::get('title'), Input::get('date'), Input::get('summary'));

            return Response::Json(array('session_created' => true, 'session_id' => $result), 200);
        } else {
            return Response::Json('Some of the required session details were not provided.', 404);
        }
    }

}