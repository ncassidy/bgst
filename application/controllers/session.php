<?php

class Session_Controller extends Base_Controller {

    public $restful = true;

    public function get_sessions()
    {
        if(!Session::has('user_id')){
            return Response::Json(array('sessions' => false, 'error' => 'You are not logged in.'), 200);
        }

        $session = new PlaySession();
        $result = $session->getSessionsByUserId(Session::get('user_id'));

        return Response::Json(array('sessions' => $result), 200);
    }

    public function get_session($session_id)
    {
        if(!Session::has('user_id')){
            return Response::Json(array('session' => false, 'error' => 'You are not logged in.'), 200);
        }

        if(isset($session_id)){
            $session = new PlaySession();
            $result = $session->getSessionById($session_id);

            return Response::Json(array('session' => $result), 200);
        } else {
            return Response::Json(array('session' => false, 'error' => 'A session_id was not supplied.'), 200);
        }
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