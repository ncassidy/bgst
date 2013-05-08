<?php

class Account_Controller extends Base_Controller {

    public $restful = true;

	public function post_login()
	{
        $validation = Validator::make(Input::all(), array(
            'email' => 'required',
            'password' => 'required'
        ));

        if($validation->fails()){
            return Response::Json('Credentials were not provided.', 404);
        }

        //get user
        $user = new User();
        $result = $user->getUserByEmail(Input::get('email'));

        //validate credentials
        if(isset($result->id) && isset($result->password) && Hash::check(Input::get('password'), $result->password)){
            Session::put('user_id', $result->id);
            $userData = $user->getUserById($result->id);

            return Response::Json($userData, 200);
        } else {
            return Response::Json('Invalid Credentials.', 403);
        }
	}

    public function post_logout()
    {
        Session::flush();

        return Response::Json(array('logged_out' => true), 200);
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

    public function post_create()
    {
        $validation = Validator::make(Input::all(), array(
            'email' => 'required|email|max:75|unique:user,email,',
            'password' => 'confirmed', //compares to password_confirmation
            'first_name'  => 'required|alpha|max:25',
            'last_name'  => 'required|alpha|max:25',
            'country' => 'required|alpha|max:2',
            'state' => 'required|alpha|max:2',
        ));

        if($validation->fails()){
            return Response::Json('Some of the required account details were not provided.', 404);
        }

        $user = new User();
        $result = $user->createUser(Input::get('email'), Hash::make(Input::get('password')), Input::get('first_name'), Input::get('last_name'), Input::get('country'), Input::get('state'));

        //login after completed
        Session::put('user_id', $result);

        return Response::Json(array('account_created' => true, 'logged_in' => true), 200);
    }

    public function post_update()
    {
        if(!Session::has('user_id')){
            return Response::Json('You are not logged in.', 403);
        }

        $validation = Validator::make(Input::all(), array(
            'first_name'  => 'required|alpha|max:25',
            'last_name'  => 'required|alpha|max:25',
            'email' => 'required|email|max:75|unique:user,email,' . Session::get('user_id'),
            'country' => 'required|alpha|max:2',
            'state' => 'required|alpha|max:2',
        ));

        if($validation->fails()){
            return Response::Json('Some of the required profile details were either not provided or failed to valiate.', 404);
        }

        $user = new User();
        $result = $user->updateUser(Session::get('user_id'), Input::get('first_name'), Input::get('last_name'), Input::get('email'), Input::get('country'), Input::get('state'));

        return Response::Json(array('profile_updated' => true), 200);
    }

}