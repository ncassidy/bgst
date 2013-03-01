<?php namespace Entities;

class User
{
    public $id;
    public $email;
    public $first_name;
    public $last_name;
    public $state;
    public $country;
    public $created_at;

    public function __construct($id, $email, $first_name, $last_name, $state, $country, $created_at)
    {
        $this->id = $id;
        $this->email = $email;
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->state = $state;
        $this->country = $country;
        $this->created_at = $created_at;
    }
}
