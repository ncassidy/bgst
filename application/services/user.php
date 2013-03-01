<?php namespace Services;

use Entities\User;
use Repositories\UserRepository;

class UserService
{
    public function __construct(){}

    public function getUser($id){
        $userRepo = new UserRepository();
        $userData = $userRepo->getUserById($id);

        $user = new User($userData['id'], $userData['email'], $userData['first_name'], $userData['last_name'], $userData['state'], $userData['country'], $userData['created_at']);

        return $user;
    }
}
