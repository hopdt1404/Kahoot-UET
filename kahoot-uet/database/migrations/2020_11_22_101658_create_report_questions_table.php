<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('report_questions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('question_id')->nullable(false);
            $table->unsignedBigInteger('topic_id')->nullable(false);
            $table->unsignedBigInteger('report_id')->nullable(false);
            $table->jsonb('result')->nullable(true);
            $table->double('correct_percent', 8, 2)->nullable(true);
            $table->double('avg_time_ans', 8, 2)->nullable(true);
            $table->unsignedInteger('number_player')->nullable(true);
            $table->unsignedInteger('number_player_ans')->nullable(true)->default(0);
            $table->boolean('a')->default(0);
            $table->boolean('b')->default(0);
            $table->boolean('c')->default(0);
            $table->boolean('d')->default(0);
            $table->double('avg_time_a', 8, 2)->nullable(true);
            $table->double('avg_time_b', 8, 2)->nullable(true);
            $table->double('avg_time_c', 8, 2)->nullable(true);
            $table->double('avg_time_d', 8, 2)->nullable(true);
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
        Schema::dropIfExists('report_questions');
    }
}
