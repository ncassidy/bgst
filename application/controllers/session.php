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

        //adjust dates
        foreach($results as $result){
            $result->date = date('F j, Y', strtotime($result->date));
        }

        return Response::Json($results, 200);
    }

    public function get_session($sessionID)
    {
        $session = new PlaySession();
        $users = new User();
        $players = new Player();

        $result = (array)$session->getSessionById($sessionID);

        if(count($result) < 1){
            return Response::Json('The requested session does not exist.', 404);
        }

        $result['date'] = date('F j, Y', strtotime($result['date']));
        $result['users'] = $users->getUsersBySessionId($sessionID);
        $result['players'] = $players->getPlayersBySessionId($sessionID);

        return Response::Json($result, 200);
    }

    public function post_create()
    {
        if(!Session::has('user_id')){
            return Response::Json('You are not logged in.', 403);
        }

        $validation = Validator::make(Input::all(), array(
            'title' => 'required|alpha_num',
            'date' => 'required|alpha_num',
            'summary' => 'required|alpha_num',
            'game_id' => 'required|integer'
        ));

        if($validation->fails()){
            return Response::Json('Some of the required session details were not provided.', 404);
        }

        $session = new PlaySession();
        $result = $session->createSession(Session::get('user_id'), Input::get('game_id'), Input::get('title'), Input::get('date'), Input::get('summary'));

        return Response::Json(array('session_created' => true, 'session_id' => $result), 200);
    }

}