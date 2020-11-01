<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sequence')->nullable(false)->comment('Số thứ tự của câu hỏi trong topic');
            $table->string('title')->nullable(true);
            $table->string('question_type')->nullable(false)->comment('QUIZ or T/F');
            $table->string('question_type_select')->nullable(false)->comment('Phương thức lựa chọn đáp án: Single select , Multi select');
            $table->unsignedInteger('time')->nullable(false)->default(0)->comment('Thời gian tối đa trả lời câu hỏi');
            $table->unsignedInteger('score')->nullable(false)->default(0)->comment('Số điểm tối đa đạt đươc của câu hỏi');
            $table->unsignedBigInteger('topic_id')->nullable(false)->comment('Id topic chứa câu hỏi');
            $table->jsonb('answer')->nullable(true)
                ->comment('Câu trả lời được phép null. ' .
                    'Format: Quiz or T/F: [{"a": "content_ans_A", "isCorrectAns": true/false, "img_ans": ""}, {}, ..]');
            $table->string('question_img')->nullable(true)->comment('Ảnh chính của câu hỏi');
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
        Schema::dropIfExists('questions');
    }
}
