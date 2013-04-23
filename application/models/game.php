<?php

class Game extends Eloquent
{

    public function getMostPlayedGames($count){
        if (Cache::has('most_played_games')){
            $response = Cache::get('most_played_games');
        } else {
            $response = DB::query('SELECT title, session_count FROM game ORDER BY session_count DESC Limit 0, ?', array($count));
            Cache::put('most_played_games', $response, 30);
        }

        return $response;
    }

    public function getGameList(){
        if (Cache::has('games_list')){
            $response = Cache::get('games_list');
        } else {
            $response = DB::query('SELECT id, title FROM game ORDER BY title ASC');
            Cache::put('games_list', $response, 30);
        }

        return $response;
    }

    public function getGameCount(){
        if (Cache::has('game_count')){
            $response = Cache::get('game_count');
        } else {
            $response = (array)DB::first('SELECT count(id) FROM game');
            $response = $response['count(id)'];
            Cache::put('game_count', $response, 30);
        }

        return $response;
    }

}
