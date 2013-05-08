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

                $userData = $user->getUserById($result->id);
                
                return Response::Json($userData, 200);
            } else {
                return Response::Json('Invalid Credentials.', 403);
            }
        } else {
            return Response::Json('Credentials were not provided.', 404);
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
                    return Response::Json('The email address supplied is already in use.', 404);
                }

                $result = $user->createUser(Input::get('email'), Hash::make(Input::get('password')), Input::get('first_name'), Input::get('last_name'), Input::get('country'));

                //login after completed
                Session::put('user_id', $result);

                return Response::Json(array('account_created' => true, 'logged_in' => true), 200);
            } else {
                return Response::Json('The password supplied did not match.', 404);
            }
        } else {
            return Response::Json('Some of the required account details were not provided.', 404);
        }
    }

    public function get_account()
    {
        if(!Session::has('user_id')){
            return Response::Json('You are not logged in.', 403);
        }

        $user = new User();
        $result = $user->getUserById(Session::get('user_id'));

        return Response::Json($result, 200);
    }

}