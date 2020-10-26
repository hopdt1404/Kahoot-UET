<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Rooms;
use Faker\Generator as Faker;

$factory->define(Rooms::class, function (Faker $faker) {
    $minValPin = 10000;
    $maxValPin = 9999999999;
    return [
        'PIN' => rand($minValPin, $maxValPin),
        'creator_id' => rand(1, 10),
        'topic_id' => rand(1, 20),
        'is_locked' => rand(0, 1),
        'is_finished' => rand(0, 1),
    ];
});
