<?php

class Game extends Eloquent
{

    public function getMostPlayedGames(){
        $response = DB::query('SELECT title, session_count FROM game ORDER BY session_count DESC Limit 0, 10');

        return $response;
    }

    public function getGameList(){
        $response = DB::query('SELECT id, title FROM game ORDER BY title ASC');

        return $response;
    }

}
