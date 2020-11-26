<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\ReportPlayer;
use Faker\Generator as Faker;

$factory->define(ReportPlayer::class, function (Faker $faker) {
    $maxQuestion = 100;
    $maxPlayer = 500;
    $ansSelect = ['A', 'B', 'C', 'D'];
    return [
        'player_id' => rand(1, $maxPlayer),
        'report_id' => 1,
        'question_id' => rand(1, $maxQuestion),
        'current_total_score' => rand(100, 1000),
        'player_score' => rand(20, 100),
        'reply_time' => rand(1, 20),
        'ans_selected' => json_encode($ansSelect[rand(0, 3)]),
    ];
});
