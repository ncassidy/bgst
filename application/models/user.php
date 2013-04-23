<?php

class User extends Eloquent
{

    public function getUserByEmail($email){
        $response = DB::first('SELECT id, password FROM user WHERE email = ?', array($email));

        return $response;
    }

    public function getUserById($userID){
        $response = DB::first('SELECT email, first_name, last_name, city, state, country, created_at FROM user WHERE id = ?', array($userID));

        return $response;
    }

    public function createUser($email, $password, $firstName, $lastName, $country){
        DB::query('INSERT INTO user (email, password, first_name, last_name, country, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())', array($email, $password, $firstName, $lastName, $country));
        $response = (array)DB::first('SELECT LAST_INSERT_ID()');

        return $response['last_insert_id()'];
    }

    public function checkDuplicate($email){
        $response = (array)DB::first('SELECT count(id) FROM user WHERE email = ?', array($email));

        return $response['count(id)'] > 0 ? true : false;
    }

    public function getUsersBySessionId($sessionID){
        $response = DB::query('SELECT user.first_name, user.last_name, user_outcome.score, user_outcome.win_status FROM user_outcome INNER JOIN user ON user_outcome.user_id = user.id WHERE user_outcome.session_id = ?', array($sessionID));

        return $response;
    }

    public function getUserCount(){
        if (Cache::has('user_count')){
            $response = Cache::get('user_count');
        } else {
            $response = (array)DB::first('SELECT count(id) FROM user');
            $response = $response['count(id)'];
            Cache::put('user_count', $response, 30);
        }

        return $response;
    }

}
