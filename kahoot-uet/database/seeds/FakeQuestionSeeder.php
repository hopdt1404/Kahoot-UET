<?php

use Illuminate\Database\Seeder;
use App\Questions;

class FakeQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $numberRecord = 500;
        factory(Questions::class, $numberRecord)->create();
    }
}
