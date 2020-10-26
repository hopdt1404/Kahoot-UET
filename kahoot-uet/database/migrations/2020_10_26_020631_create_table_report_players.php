<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableReportPlayers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('report_players', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('player_id')->nullable(false);
            $table->unsignedBigInteger('question_id')->nullable(false);
            $table->unsignedDouble('player_score', 8, 2);
            $table->unsignedFloat('reply_time', 8, 2);
            $table->jsonb('ans_selected');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('report_players');
    }
}
