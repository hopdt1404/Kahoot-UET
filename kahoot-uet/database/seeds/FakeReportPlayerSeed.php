<?php

use Illuminate\Database\Seeder;
use App\ReportPlayer;
class FakeReportPlayerSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $numberRecord = 1000;
        factory(ReportPlayer::class, $numberRecord)->create();
    }
}
