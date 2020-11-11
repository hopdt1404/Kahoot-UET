<?php

namespace App\Http\Controllers;

use App\Rooms;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function save () {


    }

    public function index (Request $request) {

        $validator = Validator::make($request->all(),[
            'creator_id' => 'bail|required|integer',
            'topic_id' => 'bail|required|integer'
        ]);

        $minPin = 10000000;
        $maxPin = 1000000000;
        $creatorId = $request['creator_id'];
        $topicId = $request['topic_id'];
        $room = Rooms::create([
            'PIN' => rand($minPin, $maxPin),
            'creator_id' => $creatorId,
            'topic_id' => $topicId,
            'is_finish' => false
        ]);
        return view('pages.topic', ['data' => $room]);
    }

    public function finishRoom (Request $request) {
        $roomId = $request['room_id'];
        $room = Rooms::where('id', $roomId)->update(['is_finish' => 1]);

        return view('pages.topic', ['data' => $room]);
    }

    public function lockRoom () {
        $roomId = 201;
        $room = Rooms::where('id', $roomId)->update(['is_lock' => 1]);
        return view('pages.topic', ['data' => $room]);
    }

}
