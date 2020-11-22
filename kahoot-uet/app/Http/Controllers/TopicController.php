<?php

namespace App\Http\Controllers;

use App\Questions;
use App\Rooms;
use App\Topics;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Validator;

class TopicController extends Controller
{
    /*
     *  Get all Topic creator by user: Waite to TEST
    */

    public function index (Request $request) {
        $validator = Validator::make($request->all(), [
            'creator_id' => 'bail|required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request',
                'error'=>$validator->errors()], 400);
        }

        $creator_id = $request['creator_id'];
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Now',
                'error'=>$validator->errors()], 400);
        }
        $myTopic = Topics::select('id' ,'name', 'creator_id', 'created_at', 'is_public', 'is_daft', 'is_played', 'created_at')->where('creator_id', $creator_id)->where('is_deleted', 0)->get();
        $result = [];
        for ($i = 0; $i < count($myTopic); $i++) {
            $topic = $myTopic[$i];
            $creatorName = User::select('username')->where('id', $topic['creator_id'])->get();
            $creatorName = $creatorName[0]['username'];
            $topic['creator_name'] = $creatorName;
            $topic['number_question'] = Questions::where('topic_id', $topic['id'])->count();
            if ($topic['is_played']) {
                $numberPlayer = Rooms::select('id')->where('topic_id', $topic['id'])->count();
                $topic['number_played'] = $numberPlayer;
            }
        }
        $result = $myTopic;
        return response()->json([
            'message'=> 'created topic successfully', $result
        ],201);
    }


    /*
     *  create topic : Wait to test
    */

    public function create (Request $request) {
        $validator = Validator::make($request->all(), [
            'creator_id' => 'bail|required|integer',
            'name' => 'bail|required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request',
                'error'=>$validator->errors()], 400);
        }
        $data = $request['topic'];
        $topic = Topics::create([
            'name' => $data['name'],
            'creator_id' => $request['creator_id']
        ]);
        return response()->json([
            'message' => "created successfully topic", $topic
        ], 201);
    }

    /*
     * Update topic: Wait test
     * (update => exist: => create new object and question of tooc)
     */
    public function update (Request $request) {
        $validator = Validator::make($request->all(), [
            'creator_id' => 'bail|required|integer',
            'name' => 'bail|required|string',
            'id' => 'bail|required|string'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request',
                'error'=>$validator->errors()], 400);
        }
        $data = $request['data'];
        Topics::where('id', $data['id'])->update(['is_duplicated' => 1]);
        $topic = Topics::create([
            'name' => $data['name'],
            'creator_id' => $request['creator_id']
        ]);
        $questions = Questions::where('topic_id', $request['topic_id'])->get();
        $numberQuestion = count($questions);
        for ($i = 0; $i < $numberQuestion; $i++) {
            $question = $questions[$i];
            $question['topic_id'] = $topic['id'];
            Questions::create($question);
        }
        return response()->json([
            'message' => "updated successfully topic"
        ], 200);
    }
    /*
     * Delete topic: Wait to test
    */
    public function delete (Request $request) {
        $validator = Validator::make($request->all(), [
            'creator_id' => 'bail|required|integer',
            'id' => 'bail|required|string'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request',
                'error'=>$validator->errors()], 400);
        }
        $data = $request['data'];
        Topics::where('id', $data['id'])->update(['is_deleted' => 1]);
        return response()->json([
            'message' => "deleted successfully topic"
        ], 200);
    }
}
