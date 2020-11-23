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
            $table->jsonb('result')->nullable(false);
            $table->double('correct_percent', 8, 2)->nullable(false);
            $table->double('avg_time_ans', 8, 2)->nullable(false);
            $table->unsignedInteger('number_player')->nullable(false);
            $table->unsignedInteger('number_player_ans')->nullable(false)->default(0);
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
