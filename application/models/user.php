<?php

class User extends Eloquent
{

    public function loginUserByCreds($email){
        $user = DB::first('SELECT id, password FROM user WHERE email = ?', array($email));

        return $user;
    }

    public function getUserById($id){
        $user = DB::first('SELECT email, first_name, last_name, city, state, country, created_at FROM user WHERE id = ?', array($id));

        return $user;
    }

}
