<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rooms extends Model
{
    protected $table = 'rooms';
    protected $guarded = [];

    public function playerRoom()
    {
//        return $this->hasMany('App\PlayerRoom');
    }
}
