<?php

class User extends Eloquent
{
    public function getUserById($id){
        $user = DB::first('SELECT email, first_name, last_name, city, state, country, created_at FROM user WHERE id = ?', array($id));

        return $user;
    }
}
