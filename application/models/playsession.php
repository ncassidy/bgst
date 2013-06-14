<?php

class PlaySession extends Eloquent
{

    public function getRecentSessions($count){
        if (Cache::has('recent_sessions')){
            $response = Cache::get('recent_sessions');
        } else {
            $response = DB::query('SELECT session.id, session.title, session.date, game.title as game_title, session.summary FROM session INNER JOIN game ON session.game_id = game.id ORDER BY session.created_at DESC Limit 0, ?', array($count));
            Cache::put('recent_sessions', $response, 30);
        }

        return $response;
    }

    public function getSessionsByUserId($userID){
        if (Cache::has('user_' . $userID . '_sessions')){
            $response = Cache::get('user_' . $userID . '_sessions');
        } else {
            $response = DB::query('SELECT session.id, session.title, session.date, game.title as game_title, session.summary FROM session INNER JOIN user ON session.user_id = user.id INNER JOIN game ON session.game_id = game.id WHERE user.id = ? ORDER BY session.created_at DESC Limit 0, 8', array($userID));
            Cache::put('user_' . $userID . '_sessions', $response, 20);
        }

        return $response;
    }

    public function getSessionById($sessionID){
        $response = DB::first('SELECT session.id, session.title as session_title, session.date, game.title as game_title, session.summary FROM session INNER JOIN game ON session.game_id = game.id WHERE session.id = ?', array($sessionID));

        return $response;
    }

    public function createSession($userID, $gameID, $title, $date, $summary){
        DB::query('INSERT INTO user (user_id, game_id, title, date, summary, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())', array($userID, $gameID, $title, $date, $summary));
        $response = (array)DB::first('SELECT LAST_INSERT_ID()');
        $response = $response['last_insert_id()'];

        //clear session cache
        Cache::forget('user_' . $userID . '_sessions');

        return $response;
    }

    public function getSessionCount(){
        if (Cache::has('session_count')){
            $response = Cache::get('session_count');
        } else {
            $response = (array)DB::first('SELECT count(id) FROM session');
            $response = $response['count(id)'];
            Cache::put('session_count', $response, 30);
        }

        return $response;
    }

}
