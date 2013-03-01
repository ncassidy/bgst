<?php namespace Repositories;


class UserRepository
{
    public function getUserById($id){
        $user = DB::first('SELECT id, email, first_name, last_name, state, country, created_at FROM users WHERE id = ?', array($id));

        return $user;
    }
}
