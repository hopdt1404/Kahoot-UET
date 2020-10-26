<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topics extends Model
{
    protected $table = 'topics';

    public function user () {
        return $this->hasOne('App\User', 'id','creator_id');
    }
//    protected $fillable = [
//      'name'
//    ];

    protected $guarded = [];
}
