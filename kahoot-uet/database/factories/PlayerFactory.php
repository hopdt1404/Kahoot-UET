<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Players;
use Faker\Generator as Faker;

$factory->define(Players::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'is_group' => rand(0, 1),
        'group_detail' => $faker->text,
        'room_id' => rand(1, 50),
        'report_id' => rand(1, 100),
        'total_score' => rand(100, 99999)
    ];
});
