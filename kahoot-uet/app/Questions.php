<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    protected $table = 'questions';

    protected $guarded = [];

    public static $QUESTION_TYPE = [
       'quiz' => 'QUIZ', 't/f' => 'T/F'
    ];
    public static $QUESTION_TYPE_SELECT = [
        'multi' => 'Multi select', 'single' => 'Single select'
    ];
}
