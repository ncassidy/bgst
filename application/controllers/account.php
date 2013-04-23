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

    public function post_create()
    {
        if(Input::has('email') && Input::has('password') && Input::has('password_confirm') && Input::has('first_name') && Input::has('last_name') && Input::has('country')){
            if(Input::get('password') == Input::get('password_confirm')){
                $user = new User();
                $isDuplicate = $user->checkDuplicate(Input::get('email'));

                //check for duplicate users
                if($isDuplicate == true){
                    return Response::Json(array('account_created' => false, 'error' => 'The email address supplied is already in use.'), 200);
                }

                $result = $user->createUser(Input::get('email'), Input::get('password'), Input::get('first_name'), Input::get('last_name'), Input::get('country'));

                return Response::Json(array('account_created' => true, 'user_id' => $result), 200);
            } else {
                return Response::Json(array('account_created' => false, 'error' => 'The password supplied did not match.'), 200);
            }
        } else {
            return Response::Json(array('account_created' => false, 'error' => 'Some of the required account details were not provided.'), 200);
        }
    }

}