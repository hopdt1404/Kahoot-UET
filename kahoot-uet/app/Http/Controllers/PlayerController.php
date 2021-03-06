<?php

namespace App\Http\Controllers;

use App\Messager;
use App\Players;
use App\Rooms;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PlayerController extends Controller
{
    /*
     *  Get Update Number Player in Room
    */
    public function index (Request $request) {
        $validator = Validator::make($request->all(), [
            'room_id' => 'bail|required|integer'
        ]);
        $data = [];
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request',
                'error'=>$validator->errors()],400);
        }
        $data['player'] = Players::select('id', 'name')->where('room_id', $request['room_id'])->orderBy('created_at')->get();
        $data['number_player'] = count($data['player']);
        return response()->json([
            'message'=> 'get all player room successfully', $data
        ],200);
    }


    /*
     *  Create Player and return Player Info
    */
    public function create (Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'bail|required|string',
            'is_group' => 'bail|boolean',
            'PIN' => 'integer|required|bail'
        ]);
        $data = [];
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request',
                'error'=>$validator->errors()],400);
        }
        $room = Rooms::select('id')->where(['PIN' => $request['PIN'], 'is_finished' => 0, 'is_locked' => 0])->get();
        $canCreatePlayer = count($room);
        if ($canCreatePlayer != 1) {
            return response()->json([
                'message'=>'Room is locked'], 400);
        }
        $player =  Players::create([
            'name' => $request['name'],
            'is_group' => $request['is_group'],
            'group_detail' => $request['group_detail'] ?: '',
            'room_id' => $room['0']['id']
        ]);
        return response()->json([
            'message'=> 'created player successfully', $player
        ],200);

    }

    /*
     *  Get Out Player  ... Room
    */
    public function getOutPlayer (Request $request)
    {
        $validator = Validator::make($request->all(),[
            'player_id' => 'bail|required|integer'
        ]);
        $data = [];
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request',
                'error'=>$validator->errors()],400);
        }
        $data['result'] = Players::where('id', $request['player_id'])->delete();
        return response()->json([
            'message'=> 'Get out player successfully'
        ],200);

    }

    /*
     * Update Total Score
     */
    public function updateTotalScore (Request $request)
    {
        $validator = Validator::make($request->all(),[
            'id' => 'bail|required|integer',
            'score' => 'bail|required|numeric'
        ]);
        $data = [];
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request'],400);
        }
        $player = Players::find($request['id']);
        $player['total_score'] += $request['score'];
        $player->save();

        $data['player'] = $player;
        return response()->json([
            'message'=> 'Update score player successfully'
        ],200);
    }

    /*
     * Get Top 5 player maximum score
    */
    public function topFiveMaxScore (Request $request)
    {
        $validator = Validator::make($request->all(),[
            'room_id' => 'bail|required|integer'
        ]);
        $data = [];
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request'],400);
        }
        $topFive = Players::select(['name', 'total_score'])->where('room_id', $request['room_id'])->orderBy('total_score', 'desc')->limit(5)->get();
        return response()->json([
            'message'=> 'Get top five player maximum score successfully', 'top_five' => $topFive
        ],200);

    }

    public function topThreeMaxScore (Request $request) {
        $validator = Validator::make($request->all(),[
            'room_id' => 'bail|required|integer'
        ]);
        $data = [];
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request'],400);
        }
        
        $topThree = Players::select(['name', 'total_score'])->where('room_id', $request['room_id'])->orderBy('total_score', 'desc')->limit(3)->get();
        return response()->json([
            'message'=> 'Get top three player maximum score successfully', 'top_three_final' => $topThree
        ],200);
    }


}
