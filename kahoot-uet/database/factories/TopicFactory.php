<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Topics;
use Faker\Generator as Faker;

$factory->define(Topics::class, function (Faker $faker) {
    return [
        'name' => $faker->text,
        'creator_id' => rand(1, 10),
        'is_deleted' => rand(0, 1),
        'is_public'  => rand(0, 1),
        'is_daft'  => rand(0, 1),
        'is_played' => rand(0, 1)
    ];
});