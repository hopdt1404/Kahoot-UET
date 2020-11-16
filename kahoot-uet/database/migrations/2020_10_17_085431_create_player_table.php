<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlayerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable(false);
            $table->boolean('is_group')->default(0);
            $table->string('group_detail')->nullable(true);
            $table->unsignedBigInteger('room_id')->nullable(false);
            $table->unsignedBigInteger('report_id')->nullable(true);
            $table->unsignedDouble('total_score', 10, 2)->default(0);
            $table->unsignedInteger('number_correct_answer')->nullable(false)->default(0);
            $table->unsignedInteger('number_incorrect_answer')->nullable(false)->default(0);
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
        Schema::dropIfExists('players');
    }
}
