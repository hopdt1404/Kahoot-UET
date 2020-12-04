<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Topics;
use Faker\Generator as Faker;

$factory->define(Topics::class, function (Faker $faker) {
    return [
        'name' => 'Report topic test',
        'creator_id' => 1,
    ];
});
