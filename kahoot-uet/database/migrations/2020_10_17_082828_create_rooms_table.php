<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('PIN')->nullable(false);
            $table->unsignedBigInteger('creator_id')->nullable(false);
            $table->unsignedBigInteger('topic_id')->nullable(false);
            $table->boolean('is_locked')->nullable(false)->default(0)->comment('Khi phòng đã lock thì có thể chọn được tên nhưng không join được vào phòng');
            $table->boolean('is_finished')->nullable(false)->default(0);
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
        Schema::dropIfExists('rooms');
    }
}
