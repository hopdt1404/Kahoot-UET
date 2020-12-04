<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('name', 95)->nullable(false)->comment('Tên của report có thể thay đổi, và mặc định là tên topic');
            $table->unsignedBigInteger('room_id')->nullable(false);
            $table->unsignedBigInteger('owner_id')->nullable(false);
            $table->unsignedInteger('number_player')->default(0);
            $table->boolean('is_deleted')->default(0);
            $table->unsignedInteger('number_question')->default(0);
            $table->string('game_mode')->nullable(true);
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
        Schema::dropIfExists('reports');
    }
}
