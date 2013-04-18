<?php

class Account_Controller extends Base_Controller {

    public $restful = true;

	public function post_login()
	{
        if(Input::has('email') && Input::has('password')){
            //get user
            $user = new User();
            $result = $user->getUserByEmail(Input::get('email'));

            //validate account
            if(isset($result->id) && isset($result->password) && Hash::check(Input::get('password'), $result->password)){
                Session::put('user_id', $result->id);
                
                return Response::Json(array('logged_in' => true), 200);
            } else {
                return Response::Json(array('logged_in' => false, 'error' => 'Invalid Credentials.'), 200);
            }
        } else {
            return Response::Json(array('logged_in' => false, 'error' => 'Credentials were not provided.'), 200);
        }
	}

    public function post_logout()
    {
        Session::flush();

        return Response::Json(array('logged_out' => true), 200);
    }

}