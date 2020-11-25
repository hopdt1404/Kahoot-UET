<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reports extends Model
{

    protected $table = 'reports';

    protected $guarded = [];

    public static $LIST_ORDER_BY = [
      'name' => 'name', 'created_at' => 'created_at' , 'number_player' => 'number_player'
    ];

    public static $ORDER_BY_TYPE = [
      'asc' => 'asc', 'desc' => 'desc'
    ];

    public function scopeWhereLike ($query, $column, $pattern)
    {
        return $query->where($column, 'like', '%' . $pattern. '%');
    }
}
