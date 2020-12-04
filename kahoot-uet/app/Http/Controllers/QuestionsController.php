<?php

namespace App\Http\Controllers;

use App\Questions;
use App\Topics;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class QuestionsController extends Controller
{
    /*
     *  Get all question by topic
    */
    public function index (Request $request) {
        $validator = Validator::make($request->all(), [
            'topic_id' => 'bail|required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request',
            'error' => $validator->errors()], 400);
        }

        $exitTopic = Topics::where('id', $request['topic_id'])->count();
        if ($exitTopic != 1) {
            return response()->json([
                'message'=>'Bad request'], 400);
        }
        $questions = Questions::where('topic_id', $request['topic_id'])->get();
        $result = [];
        for ($i = 0; $i < count($questions); $i++) {
            $question['timeLimit'] = $questions[$i]['time'];
            $question['points'] = $questions[$i]['score'];
            $question['questionType'] = $questions[$i]['question_type'];
            $question['answerOption'] = $questions[$i]['question_type_select'];
            $question['image'] = $questions[$i]['question_img'];
            $question['questionContent'] = $questions[$i]['title'];
            $question['answers'] = json_decode($questions[$i]['answer']);
            array_push($result, $question);

        }
        return response()->json([
            'message'=> 'Success', 'questionList' => $result
        ],200);
    }

    /*
     * Create question of topic: wait to test
     * (if exist => question old -> delete -> create new question )
    */
    public function create (Request $request) {
        $validator = Validator::make($request->all(), [
            'topic_id' => 'bail|required|integer',
            'sequence' => 'bail|required|integer',
            'title' => 'bail|nullable|string',
            'question_type' => ['bail', 'nullable', Rule::in(Questions::$QUESTION_TYPE)],
            'question_type_select' => ['bail', 'nullable', Rule::in(Questions::$QUESTION_TYPE_SELECT)],
            'time' => 'bail|nullable|integer',
            'score' => 'bail|nullable|integer',
            'number_question' => 'bail|nullable|integer',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request',
                'error'=>$validator->errors()], 400);
        }
        $exitTopic = Topics::where('topic_id', $request['topic_id'])->count();
        if ($exitTopic != 1) {
            return response()->json([
                'message'=>'Bad request',
                'error'=>$validator->errors()], 400);
        }

        $data = $request['data'];
        $numberQuestion = $data['number_question'];
        $data = $data['questions'];
        for ($i = 0; $i < $numberQuestion; $i++) {
            $question = $data[$i];
            Questions::create([
                'name' => $question['name'],
                'sequence' => $question['sequence'],
                'title' => $question['title'],
                'question_type' => $question['question_type'],
                'question_type_select' => $question['question_type_select'],
                'time' => $question['time'],
                'score' => $question['score'],
                'topic_id' => $request['topic_id'],
                'answer' => $question['answer'],
                'number_correct_answer' => $question['number_correct_answer']
            ]);
        }
        return response()->json([
            'message'=> 'created question successfully'
        ],201);
    }

}
