<?php

class PlaySession extends Eloquent
{

    public function getRecentSessions($count){
        if (Cache::has('recent_sessions')){
            $response = Cache::get('recent_sessions');
        } else {
            $response = DB::query('SELECT id, title, summary FROM session ORDER BY created_at DESC Limit 0, ?', array($count));
            Cache::put('recent_sessions', $response, 30);
        }

        return $response;
    }

    public function getSessionsByUserId($userID){
        if (Cache::has('user_' . $userID . '_sessions')){
            $response = Cache::get('user_' . $userID . '_sessions');
        } else {
            $response = DB::query('SELECT session.id, session.title, session.summary FROM session INNER JOIN user ON session.user_id = user.id WHERE user.id = ? ORDER BY session.created_at DESC Limit 0, 8', array($userID));
            Cache::put('user_' . $userID . '_sessions', $response, 20);
        }

        return $response;
    }

    public function getSessionById($sessionID){
        $response = DB::first('SELECT session.title as session_title, session.date, game.title as game_title, session.summary FROM session INNER JOIN game ON session.game_id = game.id WHERE session.id = ?', array($sessionID));

        return $response;
    }

    public function createSession($user_id, $game_id, $title, $date, $summary){
        DB::query('INSERT INTO user (user_id, game_id, title, date, summary, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())', array($user_id, $game_id, $title, $date, $summary));
        $response = (array)DB::first('SELECT LAST_INSERT_ID()');

        //clear session cache
        Cache::forget('user_' . $userID . '_sessions');

        return $response['last_insert_id()'];
    }

}
