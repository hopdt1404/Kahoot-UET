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
            $table->string('game_mode');
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
