<?php

class User extends Eloquent
{
    public function getUserById($id){
        $user = DB::first('SELECT id, email, first_name, last_name, state, country, created_at FROM user WHERE id = ?', array($id));

        return $user;
    }
}
