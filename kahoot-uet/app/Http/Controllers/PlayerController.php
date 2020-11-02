<?php

namespace App\Http\Controllers;

use App\Messager;
use App\Players;
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
            $data['message'] = Messager::$MESSAGE_EROORS['400'];
            $data = json_encode($data);
            return view('pages.topic', ['data' => $data]);
        }
        $data['player'] = Players::select('name')->where('room_id', $request['room_id'])->orderBy('created_at')->get();
        $data['number_player'] = count($data['player']);
        $data = json_encode($data);
        return view('pages.topic', ['data' => $data]);
    }


    /*
     *  Create Player and return Player Info
    */
    public function addPlayer (Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'bail|required|string',
            'is_group' => 'bail|boolean',
            'room_id' => 'integer|required|bail'
        ]);
        $data = [];
        if ($validator->fails()) {
            $data['message'] = Messager::$MESSAGE_EROORS['400'];
            $data = json_encode($data);
            return view('pages.topic', ['data' => $data]);
        }
        $player = Players::create([
            'name' => $request['name'],
            'is_group' => $request['is_group'],
            'group_detail' => $request['group_detail'] ?: '',
            'room_id' => $request['room_id']
        ]);
        return view('pages.topic', ['data' => $player]);
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

    public function show ()
    {

    }

}
