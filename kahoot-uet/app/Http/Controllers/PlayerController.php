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
                'message'=>'Bad request'],400);
        }
        $data['player'] = Players::select('name')->where('room_id', $request['room_id'])->orderBy('created_at')->get();
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
            'room_id' => 'integer|required|bail'
        ]);
        $data = [];
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request'],400);
        }
        $canCreatePlayer = Rooms::where(['id' => $request['room_id'], 'is_locked' => 0])->count();
        if ($canCreatePlayer != 1) {
            return response()->json([
                'message'=>'Room is locked'], 400);
        }
        $player =  Players::create([
            'name' => $request['name'],
            'is_group' => $request['is_group'],
            'group_detail' => $request['group_detail'] ?: '',
            'room_id' => $request['room_id']
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
            'id' => 'bail|required|integer'
        ]);

        $data = [];
        if ($validator->fails()) {
            $data['message'] = Messager::$MESSAGE_EROORS['400'];
            $data = json_encode($data);
            return view('pages.topic', ['data' => $data]);
        }

        $data['result'] = Players::where('id', $request['id'])->delete();

        return view('pages.topic', ['data' => $data]);

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
            $data['message'] = Messager::$MESSAGE_EROORS['400'];
            $data = json_encode($data);
            return view('pages.topic', ['data' => $data]);
        }
        $player = Players::find($request['id']);
        $player['total_score'] += $request['score'];
        $player->save();

        $data['player'] = $player;
        $data = json_encode($data);
        return view('pages.topic', ['data' => $data]);
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
            $data['message'] = Messager::$MESSAGE_EROORS['400'];
            $data = json_encode($data);
            return view('pages.topic', ['data' => $data]);
        }

        $topFive = Players::select(['name', 'total_score'])->where('room_id', $request['room_id'])->orderBy('total_score', 'desc')->limit(5)->get();
        $data['top_five'] = $topFive;
        $data = json_encode($data);
        return view('pages.topic', ['data' => $data]);

    }


}
