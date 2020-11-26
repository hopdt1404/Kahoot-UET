<?php

use Illuminate\Database\Seeder;
use App\Topics;
class ReportTopicTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $numberRecord = 1;
        factory(Topics::class, $numberRecord)->create();
    }
}
