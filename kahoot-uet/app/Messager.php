<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Messager extends Model
{
    static public $MESSAGE_EROORS = [
        '400' => 'Bad request'
    ];
}
