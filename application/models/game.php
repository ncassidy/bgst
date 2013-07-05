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

    public function getMostPlayedGamesById($id, $count){
        $response = DB::query('SELECT game.title, COUNT(game.title) FROM game INNER JOIN session ON game.id = session.game_id INNER JOIN user ON session.user_id = user.id WHERE user.id = ? GROUP BY game.title ORDER BY COUNT(game.title) DESC LIMIT 0, ?', array($id, $count));

        return $response;
    }

    public function getGameListByTitle($title, $count){
        $response = DB::query('SELECT id, title FROM game WHERE title LIKE ? ORDER BY title ASC LIMIT 0, ?', array($title . '%', $count));

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
