<?php

class Activity_Controller extends Base_Controller {

    public $restful = true;

    public function get_recentActivity()
    {
        $session = new PlaySession();
        $results = $session->getRecentSessions(8);

        return Response::Json($results, 200);
    }

}