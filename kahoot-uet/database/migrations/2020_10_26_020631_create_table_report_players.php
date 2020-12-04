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
            $table->unsignedBigInteger('report_id')->nullable(false);
            $table->unsignedBigInteger('question_id')->nullable(false);
            $table->unsignedDouble('current_total_score', 10, 2)->default(0);
            $table->unsignedDouble('player_score', 8, 2)->nullable(false)->default(0);
            $table->unsignedFloat('reply_time', 8, 2)->nullable(false)->default(0);
            $table->jsonb('ans_selected')->nullable(true);
            $table->unsignedSmallInteger('number_correct_answer')->nullable(false)->default(0);
            $table->unsignedSmallInteger('number_incorrect_answer')->nullable(false)->default(0);
            $table->boolean('a')->default(0);
            $table->boolean('b')->default(0);
            $table->boolean('c')->default(0);
            $table->boolean('d')->default(0);
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
