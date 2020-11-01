<?php

namespace App\Http\Controllers;

use App\Questions;
use Illuminate\Http\Request;

class QuestionsController extends Controller
{
    public function index () {
        $topicId = 3;
        $myQuestion = Questions::select('sequence', 'title', 'time', 'question_type', 'question_type_select', 'score', 'answer', 'question_img')->where('topic_id', $topicId)->get();
        return view('pages.topic', ['data' => $myQuestion]);
    }
}
