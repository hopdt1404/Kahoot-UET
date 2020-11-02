<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reports extends Model
{

    protected $table = 'reports';

    protected $guarded = [];

    public function scopeWhereLike ($query, $column, $pattern)
    {
        return $query->where($column, 'like', '%' . $pattern. '%');
    }
}
