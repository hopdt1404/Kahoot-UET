<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Questions;
use Faker\Generator as Faker;

$factory->define(Questions::class, function (Faker $faker) {
    $questionType = ['QUIZ', 'T/F'];
    $questionTypeSelect = ['Multi-select', 'Single select'];
    return [
        'sequence' => rand(1, 30),
        'title' => $faker->text,
        'time' => rand(0, 300),
        'question_type' => $questionType[rand(0, count($questionType) - 1)],
        'question_type_select' => $questionTypeSelect[rand(0, count($questionTypeSelect) - 1)],
        'score' => rand(100, 1000),
        'topic_id' => rand(1, 20),
        'question_img' => $faker->url,
        'answer' => json_encode([
            "content" => $faker->text,
            "isCorrectAns" => rand(0, 1),
            "img_ans" => $faker->url
        ], JSON_PRETTY_PRINT)
    ];
});
