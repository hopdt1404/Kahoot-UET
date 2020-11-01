<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Reports;
use Faker\Generator as Faker;

$factory->define(Reports::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'room_id' => rand(1, 50),
        'owner_id' => rand(1, 10),
        'game_mode' => $faker->companySuffix
    ];
});
