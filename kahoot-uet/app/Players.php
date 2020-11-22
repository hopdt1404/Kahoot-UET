<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Players extends Model
{
    protected $table = 'players';

    protected $guarded = [];

    public function answer () {
        return $this->hasMany('App\ReportPlayer', 'player_id', 'id' );
    }
}
