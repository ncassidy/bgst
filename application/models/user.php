<?php

class User extends Eloquent
{

    public function getUserByEmail($email){
        $response = DB::first('SELECT id, password FROM user WHERE email = ?', array($email));

        return $response;
    }

    public function getUserById($id){
        $response = DB::first('SELECT email, first_name, last_name, city, state, country, created_at FROM user WHERE id = ?', array($id));

        return $response;
    }

}
