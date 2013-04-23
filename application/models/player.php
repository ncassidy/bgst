<?php

class Player extends Eloquent
{

    public function getPlayersBySessionId($sessionID){
        $response = DB::query('SELECT player.name, player_outcome.score, player_outcome.win_status FROM player_outcome INNER JOIN player ON player_outcome.player_id = player.id WHERE player_outcome.session_id = ?', array($sessionID));

        return $response;
    }

}
